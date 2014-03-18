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

	var edit = function() {
		$("#activitiesContainer").hide();
		$("#addButtonContainer").hide();
		$("#addDayButton").hide();
		$("#popup").show();
		$("#updateActivity").show();

		$("#saveActivity").hide();
		$("#cancelActivity").hide();

		console.log(model.getTypeId);
	}
		
	model.addObserver(this);
	this.update = function(arg){
		
		switch (arg) {
		case "day" : $( "#activitiesContainer" ).sortable( "option", "connectWith", ".dayActivity, #activitiesContainer" );
		break;
		default : view.fillActivities(); 
				$("#activitiesContainer").sortable( "refresh" );
				$("li#activity.activityObject").dblclick(function() { 
					edit(); 
				});
		}
	}
}