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
			//$("#dayContainer").hide();
			//$("#addDayButton").hide();
			$("#popup").show();
		}
	);

	model.addObserver(this);
	this.update = function(arg){
		
		switch (arg) {
		case "day" : $( "#activitiesContainer" ).sortable( "option", "connectWith", ".dayActivity" );
		break;
		default : view.fillActivities(); 
				$("#activitiesContainer").sortable( "refresh" );
		}
	}
}