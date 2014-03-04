var DragDropController = function(view, model ) {	
	// Drag anywhere on screen
	view.activity.draggable();

	// If user drop inside div and prevent select again
	view.addDay.droppable({
		drop: function( event, ui ) {
		event.defaultPrevented();
		}
	});

	// Have to deal with margins that fits new days
	view.addDayButton.click( function(){ 
		var div = $("<div>");
		div.attr("id", "addDay");
		div.css("margin-top", "0px");
		div.css("margin-left","300px");
		view.addDay.append(div);

		$("#addDayButton").css("margin-left","350px");
	});
}