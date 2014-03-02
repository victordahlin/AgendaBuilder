var DragDrop = function (container,model) {

	// Drag anywhere on screen
	$( "#activity" ).draggable();
	
	// If user drop inside div and prevent select again
	$( "#addDay" ).droppable({
		drop: function( event, ui ) {
			event.defaultPrevented();
		}
	});
}