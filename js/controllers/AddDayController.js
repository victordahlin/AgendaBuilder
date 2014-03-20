var AddDayController = function(view, model) {

	// Event handler for creating day in view and add it to the 
	// model
	view.addDayButtonBox.click( function(){		
		view.createDay();
		model.addDay();
	});	

}