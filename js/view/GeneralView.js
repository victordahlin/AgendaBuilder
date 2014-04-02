function GeneralView(view, model){
	
	model.addObserver(this);	
	this.update = function(arg){
		var days = model.days;
		for(var i = 0; i < days.length; ++i ) {
			console.log(i);
			view.createDay();
		} 
	}
}