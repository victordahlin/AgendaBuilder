var ActivitiesController = function(view, model) {

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


	var updatebutton = $("#updateActivity");
	
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

		if((parseFloat(length) == parseInt(length)) && !isNaN(length) && parseInt(length)<1440){

			if(name!="" && length!="" && typeid!=""){
				var time = parseInt(length) - parseInt(oldTime);
				if (model.checkEndTime(containerID,time,type)){
					activity.setName(name);
					activity.setLength(length);
					activity.setTypeId(typeid);
					activity.setDescription(description);
					model.saveUpdatedActivity(containerID);
					$("#myModalLabel").html("");
					$("#modalBody").html("The activity has been updated!");
					$("#modalButtonCancel").hide();
					$("#modalButtonRemove").hide();
					$("#modalButtonOK").show();				
					hidePopup();
				}else{

				$("#myModalLabel").html("");
				$("#modalBody").html("The day isn't long enough");
				$("#modalButtonCancel").hide();
				$("#modalButtonRemove").hide();
				$("#modalButtonOK").show();
				}
			}else{ 
				$("#myModalLabel").html("");
				$("#modalBody").html("Fill all of the boxes with valid data please ");
				$("#modalButtonCancel").hide();
				$("#modalButtonRemove").hide();
				$("#modalButtonOK").show();
			}
		}else{
			$("#myModalLabel").html("");
			$("#modalBody").html("Length must be a whole number");
			$("#modalButtonCancel").hide();
			$("#modalButtonRemove").hide();
			$("#modalButtonOK").show();
		}
	});

	var deletebutton = $("#deleteActivity");
	//sets on click-listener to the deletebutton in the popup
	//brings forth a confirmation prompt.
	deletebutton.click(function(){		
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

		
	model.addObserver(this);
	this.update = function(arg){
		
		switch (arg) {
		case "day" : $( "#activitiesContainer" ).sortable( "option", "connectWith", ".dayActivity, #activitiesContainer" );
		break;
		default : view.fillActivities(); 
				$("#activitiesContainer").sortable( "refresh" );				
		}
	}
}