var DayController = function(view, model ) {	

	// If user drop inside div and prevent select again
	this.dayAct = function() {
		//var array = model.getParkedActivities();
		view.dayActivity.droppable({
			drop: function( e, ui ) {
				//model.removeParkedActivity(1);
                // Får fixa tiderna på nått sätt
				$("#addDayStartTimeBox").html("0" + model.days[0].getStart() + "0");
                $("#addDayEndTime").html("End time: 0" + model.days[0].getEnd() + "0");
                $("#addDayTotalLength").html("Total length: 0" + model.days[0].getEnd() + "0");

                //console.log("Day Start: " + model.days[0].getStart());
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