var DayView = function (container, model){
	
	this.dayID = (model.days.length-1);
	console.log("dayID " + this.dayID);

	var dayObject = $("<div>");
	dayObject.attr("id", this.dayID);
	dayObject.addClass("col-md-2");		
	
	var dayInfo = $("<div>");
	dayInfo.attr("id", "dayInfo");
	
	var dayStartTime = $("<div>");
	dayStartTime.attr("id", "addDayStartTime");
	dayStartTime.html("Start time:");
	this.dayStartTimeBox = $("<div>"); //should be box instead of div???
	this.dayStartTimeBox.attr("id", "addDayStartTimeBox");
	this.dayStartTimeBox.html(model.days[this.dayID].getStart());
	dayStartTime.append(this.dayStartTimeBox);
	dayInfo.append(dayStartTime);		
	
	var dayEndTime = $("<div>");
	dayEndTime.attr("id", "addDayEndTime");
	dayEndTime.html("End time: ");
	this.dayEndTimeBox = $("<div>");
	this.dayEndTimeBox.attr("id", "addDayEndTimeBox");
	this.dayEndTimeBox.html(model.days[this.dayID].getEnd());
	dayEndTime.append(this.dayEndTimeBox);
	dayInfo.append(dayEndTime);
	
	var dayTotalLength = $("<div>");
	dayTotalLength.attr("id", "dayTotalLength");
	dayTotalLength.html("Total Length: ");
	this.totalTime = $("<span>");
	this.totalTime.attr("id", "dayTotalLengthBox");
	this.totalTime.html("0");
	dayTotalLength.append(this.totalTime);
	dayTotalLength.append(" min");
	dayInfo.append(dayTotalLength);
			
	this.dayActivity = $("<ul>");	//container for activities
	this.dayActivity.addClass("dayActivity");	
	this.dayActivity.attr("id", this.dayID);
			
	dayObject.append(dayInfo, this.dayActivity);
			
	container.append(dayObject);	
	
			
	model.addObserver(this);
	
	this.update = function(arg){		
		//console.log(model.days[this.dayID].getStart());
		//console.log(model.days[this.dayID].getEnd());
		//console.log(model.days[this.dayID].getTotalLength());

		$(".dayActivity").sortable({	
			//http://api.jqueryui.com/sortable/#event-change
			revert : true,
		    receive : function (event, ui) {
			  //model.moveActivity(oldday, oldposition, newday, newposition)
			  //model.moveActivity(e.target, ui.draggable.id, view.dayID, ???);
			  var day = model.days.length-1;
			$("#addDayStartTimeBox").html(model.days[day].getStart());
			$("#addDayEndTimeBox").html(model.days[day].getEnd());
			$("#dayTotalLengthBox").html(model.days[day].getTotalLength());

		    },
			change: function (event, ui) {
			
			console.log(ui.originalPosition);
			console.log(ui.position);	//coordinates - blההההההההה
			console.log(ui.sender); //null if from same container

			
				//model.moveActivity(oldday, oldposition, newday, newposition)
				//model.moveActivity(e.target, ui.draggable.id, view.dayID, ???);
			},
			connectWith : ".dayActivity, #activitiesContainer"
		});
	}
	
	
}