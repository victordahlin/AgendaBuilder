var ActivitiesController = function(view, model) {
	var updatebutton = $("#updateActivity");
	var deletebutton = $("#deleteActivity");


	//On click listener for the add activity-button. Brings a popup.
	view.newActivity.click(function(){
			$("#name").val("");
			$("#length").val("");
			$("#typeid").val("");
			$("#description").val("");
			showPopup("create");
	});

	//Makes the parked activity list sortable and thereby droppable.
	//When activity is received(dropped) in the list the model is updated by moveActivity()	
	view.activities.sortable({
			items : "> li",	
        	revert : true,
                      
            receive: function (event, ui) {     
                var oldday = ui.sender.attr("id");
               	var newday = null;
                var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				
                model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition);
        	},
            connectWith : ".dayActivity, #activitiesContainer"			
	});

	//Sets double click-listeners to all activity list elements for update or deletion.
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
	
	//sets on-click listener to the update button in the "popup",
	//when clicked, data i validated and if valid saved to the 
	//activity in the model
	updatebutton.on("click", function(){
		var type = null;
		var activityIndex = $("#popup").data("activityIndex");
		var containerID = $("#popup").data("containerID");
		if(containerID == "activitiesContainer"){										
			var activity = model.parkedActivities[activityIndex];
			type = "parked";

		}else{				
			var activity = model.days[containerID]._activities[activityIndex];
			type = "receive";
		}

		var name = $("#name").val();
		var length = $("#length").val();
		var typeid = $("#typeid").val();
		var description = $("#description").val();
		var oldTime = activity.getLength();

		if((parseFloat(length) == parseInt(length)) && !isNaN(length) && parseInt(length)>=0){
			if(name!="" && length!="" && typeid!=""){
				var time = parseInt(length) - parseInt(oldTime);
				if (model.checkEndTime(containerID,time,type)){
					activity.setName(name);
					activity.setLength(length);
					activity.setTypeId(typeid);
					activity.setDescription(description);
					model.saveUpdatedActivity(containerID);
				
					hidePopup();
				}else{
					showModalBox();
				$("#modalBody").html("The day isn't long enough");
				}
			}else{ 
				showModalBox();
				$("#modalBody").html("Fill all of the boxes with valid data please ");
			}
		}else{
			showModalBox();
			$("#modalBody").html("Length must be a whole positive number");
		}
	});

	//sets on click-listener to the delete button in the popup
	//brings forth a confirmation prompt.
	deletebutton.click(function(){		
		showModalBox();
		$("#myModalLabel").html("Confirm remove activity");
		$("#modalBody").html("Are you sure you want to remove this activity?");
		$("#modalButtonOK").hide();
		$("#modalButtonRemove").show();
		$("#modalButtonCancel").show();
	});
	
	//sets on click-listener to the removebutton in the confirmation prompt
	//if pressed activity is removed from the model.
	$("#modalButtonRemove").click(function(){
		var containerID = $("#popup").data("containerID");		
		var activityIndex = $("#popup").data("activityIndex");		
		model.removeActivity(containerID, activityIndex);
		hidePopup();
	});
		

	/* Upon notification from model:
	If a new day is created, and "day" is provided as argument, the parked activity list is connect to the new days activity list. 
	The default action is to refill parked activity list.
	*/	
	model.addObserver(this);
	this.update = function(arg){		
		if (arg == "dayCreated"){
			$( "#activitiesContainer" ).sortable( "option", "connectWith", ".dayActivity, #activitiesContainer" );
		}
	}
}