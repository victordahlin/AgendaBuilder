var Activities = function (container,model) {
	
	this.newActivity = container.find("#addActivityButton");
	this.activities = $(container.find("#activitiesContainer"));	

	var array = model.parkedActivities;
	//console.log("array length=" + array.length);
	
	this.fillActivities = function(){
		this.activities.empty();
		for( var i = 0; i < array.length; i++ ) {
			var div = $("<li>");
			var timeElement = $("<div>");
			var nameElement = $("<div>");

			div.attr("id","activity");
			div.data("start_pos", i)
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
			this.activities.append(div);
		}

		this.activities.sortable({
		items : "> li",
		connectWith : ".dayActivity",
		revert : true		
		});
		
	}

}