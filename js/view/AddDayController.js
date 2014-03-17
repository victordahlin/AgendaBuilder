var AddDayController = function(model) {

	$("#addDayButton").click( function(){ 
		var day = new DayView($("#dayContainer"), model);
		new DayController(day,model);
	});	

}