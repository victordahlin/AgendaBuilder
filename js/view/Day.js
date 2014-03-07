var DayActivity = function (container,model) {

	this.dayActivity = container.find("#dayActivity");
	this.addDayButton = container.find("#addDayButton");
	this.dayContainer = container.find("#dayContainer");

	model.addObserver(this);
	this.update = function(arg){

		this.dayActivity.sortable({ 
		    receive: function (event, ui) {
		        ui.item.remove();
		    }
		});
	}
}