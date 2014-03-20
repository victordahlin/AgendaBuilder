var ActivitiesController = function(view, model) {

	hidePopup();

	view.newActivity.click(
		function(){
			$("#name").val("");
			$("#length").val("");
			$("#typeid").val("");
			$("#description").val("");
			showPopup("create");

		}
	);
	
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
				console.log("parked activity"); //for debug
        	},
            connectWith : ".dayActivity, #activitiesContainer"
			
     	});

	//$("li#activity.activityObject").dblclick(function() {
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
				alert("Fill all o' them boxes");
			}
		}else{ 
			alert("Length must be a whole number")
		}

	});

	var deletebutton = $("#deleteActivity");
	deletebutton.on("click",function(){
	//do confirm prompt			
		
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