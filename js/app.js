$(function() {
	//The global variable so we can access it from other controller and views
	//window.stage = "starter";
	
	//We instantiate our model
	var model = new Activity();
	
	// Views
	var dragdrop = new DragDrop($("#container"),model);

	// Controllers
});