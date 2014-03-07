$(function() {
	//The global variable so we can access it from other controller and views
	//window.stage = "starter";
	
	//We instantiate our model
	var model = new Model();
	
	// Views
	var activities = new Activities($("#activities"),model);
	var addActivity = new AddActivity($("#popup"),model);
	var dayActivity = new DayActivity($("#container"),model);

	// Controllers
	var activitiesController = new ActivitiesController(activities,model);
	var addActivityController = new AddActivityController(addActivity,model);
	var dayController = new DayController(dayActivity,model);
});