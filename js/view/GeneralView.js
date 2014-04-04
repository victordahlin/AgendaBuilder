function GeneralView(view, model){
	
	model.addObserver(this);	
	this.update = function(arg){
			
		if(arg=="createDay"){
			$("#dayContainer").empty();	
			for(var j = 0; j< model.days.length; j++){
				view.createDay(j);
			}
		} 
	}
}