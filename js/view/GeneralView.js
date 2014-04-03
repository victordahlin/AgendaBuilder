function GeneralView(view, model){
	
	model.addObserver(this);	
	this.update = function(arg){
		console.log(arg);

		if(arg=="createDay"){
			view.createDay();

		} 
	}
}