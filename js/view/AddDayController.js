var AddDayController = function(model) {	

	$("#addDayButton").click( function(){ 
		model.addDay(); //could be changed to add day with user input.
		var day = new DayView($("#dayContainer"), model);
		new DayController(day, model);
	});
	
}