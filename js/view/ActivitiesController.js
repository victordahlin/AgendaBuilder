var ActivitiesController = function(view, model) {

	$("#popup").hide();

	view.newActivity.click(
		function(){
			$("#name").val("");
			$("#length").val("");
			$("#typeid").val("");
			$("#description").val("");
			$("#activitiesContainer").hide();
			$("#addButtonContainer").hide();
			$("#addDayButton").hide();
			$("#updateActivity").hide();
			$("#popup").show();
			$("#saveActivity").show();
			$("#cancelActivity").show();
			$("#deleteActivity").hide();

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
				console.log("parked activity");
        	},
            connectWith : ".dayActivity, #activitiesContainer"
			
     	});

	//$("li#activity.activityObject").dblclick(function() {
	$(document).on("dblclick", "li#activity.activityObject", function (){
			var activityIndex = $(this).index();
			var containerID = $(this).parent().attr("id");
			console.log(activityIndex);
			console.log(containerID);
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
			$("#activitiesContainer").hide();
			$("#addButtonContainer").hide();
			$("#addDayButton").hide();
			$("#popup").show();
			$("#updateActivity").show();
			$("#saveActivity").hide();
			$("#cancelActivity").show();
			$("#deleteActivity").show();
	});

	var updatebutton = $("#updateActivity");
	updatebutton.on("click", function(){

		var activityIndex = $("#popup").data("activityIndex");
		var containerID = $("#popup").data("containerID");
		console.log(activityIndex);
		console.log(containerID);
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

				console.log(activity);
				activity.setName(name);
				activity.setLength(length);
				activity.setTypeId(typeid);
				activity.setDescription(description);
				model.saveUpdatedActivity(containerID);

				$("#activitiesContainer").show();
				$("#addButtonContainer").show();
				$("#addDayButton").show();
				$("#popup").hide();
				$("#updateActivity").hide();
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
		$("#activitiesContainer").show();
		$("#addButtonContainer").show();
		$("#addDayButton").show();
		$("#popup").hide();
		$("#updateActivity").hide();	
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