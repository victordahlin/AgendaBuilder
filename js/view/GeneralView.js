function GeneralView(view, model){
	
	model.addObserver(this);	
	this.update = function(arg){
		
		if(arg=="createDay"){
			view.createDay();

		} 
	}
}