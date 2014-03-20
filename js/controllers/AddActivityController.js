var AddActivityController = function(view, model) {

	hidePopup();

	// When user press cancel the activities will show
	// and hides the popup box
	view.cancelButton.click(
		function(){
			$("#popup").hide();	
			$("#activitiesContainer").show();
			$("#addButtonContainer").show();
			$("#addDayButton").show();			
		}
	);
	

	// When user press save this function will grab values
	// check user input and if everything is correct a new 
	// activity will be created
	view.saveButton.click(
		function(){
			var name = $("#name").val();
			var length = $("#length").val();
			var typeid = $("#typeid").val();
			var description = $("#description").val();

   			if((parseFloat(length) == parseInt(length)) && !isNaN(length)){

				if(name!="" && length!="" && typeid!="" && typeid != null){
					var act = new Activity(name,length,typeid,description);
					model.addParkedActivity(act);
					
					$("#popup").hide();
					$("#activitiesContainer").show();
					$("#addButtonContainer").show();
					$("#addDayButton").show();
				}
				else{
					$('#modalBox').modal('toggle');
					$("#myModalLabel").html("");
					$("#modalBody").html("Fill all o' them boxes");
					$("#modalButtonCancel").hide();
				}
			}
			else { 
				$('#modalBox').modal('toggle');
				$("#myModalLabel").html("");
				$("#modalBody").html("Fill all o' them boxes");
				$("#modalButtonCancel").hide();
			}
		}
	);

	$(document).on("dblclick", "li#activity.activityObject", function (){
		var activityIndex = $(this).index();
		var containerID = $(this).parent().attr("id");			
		$("#popup").data("activityIndex", activityIndex);
		$("#popup").data("containerID", containerID);

		if(containerID == "activitiesContainer"){										
			var activity = model.parkedActivities[activityIndex];

		}else{				
			var activity = model.days[containerID]._activities[activityIndex];
		}
		$("#name").val(activity.getName());
		$("#length").val(activity.getLength());
		$("#typeid").val(activity.getTypeId());
		$("#description").val(activity.getDescription());
		showPopup("update");
	});


	var updatebutton = $("#updateActivity");
	updatebutton.on("click", function(){

		var activityIndex = $("#popup").data("activityIndex");
		var containerID = $("#popup").data("containerID");
		if(containerID == "activitiesContainer"){										
			var activity = model.parkedActivities[activityIndex];

		}else{				
			var activity = model.days[containerID]._activities[activityIndex];
		}

		var name = $("#name").val();
		var length = $("#length").val();
		var typeid = $("#typeid").val();
		var description = $("#description").val();

		if((parseFloat(length) == parseInt(length)) && !isNaN(length)){

			if(name!="" && length!="" && typeid!=""){

				activity.setName(name);
				activity.setLength(length);
				activity.setTypeId(typeid);
				activity.setDescription(description);
				model.saveUpdatedActivity(containerID);

				hidePopup();
			}else{

				$("#myModalLabel").html("");
				$("#modalBody").html("Fill all o' them boxes");
				$("#modalButtonCancel").hide();
			}
		}else{ 
				$("#myModalLabel").html("");
				$("#modalBody").html("Fill all o' them boxes");
				$("#modalButtonCancel").hide();
		}

	});

	var deletebutton = $("#deleteActivity");
	deletebutton.on("click",function(){		
		$("#myModalLabel").html("Confirm remove activity");
		$("#modalBody").html("Are you sure you want to remove this activity?");
		$("#modalButtonCancel").show();

		$("#modalButtonOK").click(function(){
			var pressed = $(this).attr("value");

			if(pressed == "OK") {
				var containerID = $("#popup").data("containerID");		
				var activityIndex = $("#popup").data("activityIndex");		
				model.removeActivity(containerID, activityIndex);
				hidePopup();
			}
			
		});
	});
	
}