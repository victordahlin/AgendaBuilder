var Day = function (container,model) {



	model.addObserver(this);
	this.update = function(arg){
		// Drag anywhere on screen
		this.dayActivity = container.find("#dayActivity");
		this.addDayButton = container.find("#addDayButton");
		this.dayContainer = container.find("#dayContainer");

		this.dayActivity.sortable({ 
		    receive: function (event, ui) {
		        ui.item.remove();
		    }
		});
	}
}