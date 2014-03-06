var Day = function (container,model) {

	// Drag anywhere on screen
	this.activity = container.find(".activityObject");
	this.dayActivity = container.find("#dayActivity");
	this.addDayButton = container.find("#addDayButton");
	this.dayContainer = container.find("#dayContainer");

	this.dayActivity.sortable({ 
		containment: "parent", 
		revert: true 
	});
}