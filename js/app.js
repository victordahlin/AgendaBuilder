$(function() {
	//The global variable so we can access it from other controller and views
	//window.stage = "starter";
	
	//We instantiate our model
	var model = new Activity();
	
	// Views
	var dragdrop = new DragDrop($("#container"),model);
	var activities = new Activities($("#activities"),model);
	var addActivity = new AddActivity($("#addActivity"),model);

	// Controllers
	var activitiesController = new ActivitiesController(activities,model);
	var addActivityController = new AddActivityController(addActivity,model);
	var dragdropcontroller = new DragDropController(dragdrop,model);
});