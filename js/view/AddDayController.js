var AddDayController = function(view, model) {

	view.addDayButtonBox.click( function(){		
		view.createDay();
		model.addDay();
	});	

}