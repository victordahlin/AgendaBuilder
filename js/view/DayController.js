var DayController = function(view, model ) {	


	//should be in activity controller
	// Drag to dayActivies and restore if else were
	view.activity.draggable({
		revert: "invalid",
		connectToSortable: "#dayActivity"
	});

	// If user drop inside div and prevent select again
	view.dayActivity.droppable({
		drop: function( event, ui ) {	
		console.log($(this));					
			//$("#dayActivity").append($(ui.helper));
		}
	});

	// Have to deal with margins that fits new days
	view.addDayButton.click( function(){ 
		var div = $("<div>");
		div.attr("id", "addDay");
		div.css("margin-top", "0px");
		div.css("margin-left","300px");
		view.dayActivity.append(div);

		$("#addDayButton").css("margin-left","350px");
	});

}