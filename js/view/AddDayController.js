var AddDayController = function(view,model) {	

	view.addDayButtonBox.click( function(){ 
		model.addDay(); //could be changed to add day with user input.
		var day = new DayView($("#dayContainer"), model);
	});	
}