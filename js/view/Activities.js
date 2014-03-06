var Activities = function (container,model) {

	this.newActivity = container.find("#addActivityButton");
	var activities = $(container.find("#activitiesContainer"));

	var array = model.getParkedActivities();
	this.fillActivities = function(){
		activities.empty();
		for( var i = 0; i < array.length; i++ ) {
			var div = $("<div>");
			var timeElement = $("<div>");
			var nameElement = $("<div>");


			div.attr("id","activity");
			div.addClass("row");
			div.addClass("activityObject");

			var name = array[i].getName();
			var type = array[i].getType();
			console.log(name);
			var time = array[i].getLength();

			timeElement.html(time + " min");
			timeElement.attr("id","activityTime");
			timeElement.addClass("col-md-4");

			nameElement.html(name);
			nameElement.addClass(type);
			nameElement.addClass("col-md-8");
			nameElement.attr("id","activityName");

			div.append(timeElement);
			div.append(nameElement);
			activities.append(div);
		}

	}


	model.addObserver(this);
	this.update = function(arg){
		this.fillActivities();
	}
}