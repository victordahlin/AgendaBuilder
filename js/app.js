$(function() {
	
	//We instantiate our model
	var model = new Model();
	
	// Views
	var activities = new Activities($("#activities"), model);
	var addActivity = new AddActivity($("#popup"), model);
	var dayView = new DayView($("#dayContainer"), model);

	// Controllers
	var activitiesController = new ActivitiesController(activities, model);
	var addActivityController = new AddActivityController(addActivity, model);
	var addDayController = new AddDayController(dayView,model);
});