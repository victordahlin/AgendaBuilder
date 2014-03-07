var DayController = function(view, model ) {	

	// If user drop inside div and prevent select again
	this.dayAct = function() {
		var array = model.getParkedActivities();
		view.dayActivity.droppable({
			drop: function( e, ui ) {
				//model.removeParkedActivity(1);
			}
		});
}

	// Have to deal with margins that fits new days
	view.addDayButton.click( function(){ 
		var div = $("<div>");
		div.attr("id", "addDay");
		div.css("margin-top", "0px");
		div.css("margin-left","300px");
		view.dayActivity.append(div);

		$("#addDayButton").css("margin-left","350px");
	});


	model.addObserver(this);
	this.update = function(arg){
		this.dayAct();
	}

}