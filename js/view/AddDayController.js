var AddDayController = function(view,model) {


	view.addDayButtonBox.click( function(){ 
		model.addDay(); //could be changed to add day with user input.
		view.createDay();
		//var day = new DayView($("#dayContainer"), model);
	});	

	model.addObserver(this);
       
    this.update = function(arg){

     }

}