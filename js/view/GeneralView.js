function GeneralView(view, model){
	
	model.addObserver(this);	
	this.update = function(arg){
		console.log(arg);

		if(arg=="day"){
			view.createDay();

		} 
	}
}