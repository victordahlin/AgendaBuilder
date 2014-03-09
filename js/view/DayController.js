<<<<<<< HEAD
var DayController = function(view, model) {	
	
	/*view.dayActivity.droppable({
			drop: function(e, ui ) {
			console.log(e.target);
			console.log(ui.draggable);
			console.log(view.dayID);
			//model.moveActivity(oldday, oldposition, newday, newposition)
			//model.moveActivity(e.target, ui.draggable.id, view.dayID, ???);
=======
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
>>>>>>> fc4bb41c3660f1549ae5847cf2dcd66f2b8e2550
			}
		}); */

}