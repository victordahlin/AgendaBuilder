var Activities = function (container,model) {

	this.newActivity = container.find("#addActivityButton");
	var activities = $(container.find("#activitiesContainer"));

	var array = model.getParkedActivities();
	this.fillActivities = function(){
		activities.empty();
		for( var i = 0; i < array.length; i++ ) {
			var div = $("<div>");
			div.attr("id","activity");
			var name = array[i].getName();
			div.html(name);
			activities.append(div);
		}

	}


	model.addObserver(this);
	this.update = function(arg){
		this.fillActivities();
	}
}