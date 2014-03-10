var DayView = function (container, model){

	this.addDayButtonBox = $("#addDayButton");
	
	this.dayID = (model.days.length-1);
	//console.log("dayID " + this.dayID);

	var dayObject = $("<div>");
	dayObject.attr("id", this.dayID);
	dayObject.addClass("col-md-2");		
	
	var dayInfo = $("<div>");
	dayInfo.attr("id", "dayInfo");
	
	var dayStartTime = $("<div>");
	dayStartTime.attr("id", "addDayStartTime");
	dayStartTime.html("Start time:");
	this.dayStartTimeBox = $("<div>");
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
			
	this.dayActivity = $("<ul>");
	this.dayActivity.addClass("dayActivity");	
	this.dayActivity.attr("id", this.dayID);

	var dayBreaks = $("<div>");
	dayBreaks.attr("id", "dayBreaks");
	this.canvasDiv = $("<canvas>");
	this.canvasDiv.attr("width","70");
	this.canvasDiv.attr("height","70");
	this.canvasDiv.attr("id","canvasBox");

	dayBreaks.append(this.canvasDiv);
	dayInfo.append(dayBreaks);
	dayObject.append(dayInfo, this.dayActivity);			
	container.append(dayObject);


	var dayInfoBox = function() {
		var day = model.days.length-1;
		$("#addDayStartTimeBox").html(model.days[day].getStart());
		$("#addDayEndTimeBox").html(model.days[day].getEnd());
		$("#dayTotalLengthBox").html(model.days[day].getTotalLength());	
	}
	dayInfoBox();

	var dayInfoBoxStatus = function() {
		var day = model.days.length-1;
  	   	var context = $("#canvasBox").get(0).getContext("2d");
    	var activityArray = model.days[day]._activities; 

		//total box size
		var width = 60;
		var height = 70;

		//box start coordinates
		var x = 5;
		var y = 0;

		var totalLength = model.days[day].getTotalLength();

		var array = [0,0,0,0];
		
		for (var i = 0; i < activityArray.length; i++ ){
			var type = activityArray[i].getType();

			switch (type){ 
			case "Presentation":
				array[0] += activityArray[i].getLength()* height / totalLength;
				break;
			case "Group Work":
				array[1] += activityArray[i].getLength() * height / totalLength;
				break;			
			case "Discussion":
				array[2] += activityArray[i].getLength() * height / totalLength;
				break;
			case "Break":
				array[3] += activityArray[i].getLength() * height / totalLength;
				break;
			}		
		}     	

		//fill box
		var colors = ["#E0EBFF","#FFD6CC","#D6EAD6","#FFFF66"]
		for (var i=0; i < array.length; i++){
			context.beginPath();
 			context.rect(x, y, width, height);
			context.fillStyle= colors[i];
   			context.fill();
   			y = y + array[i];
		}

   		//red line
   		y = height*0.7;
   		context.beginPath();
		context.moveTo(0,y);
		context.lineTo(70,y);
		context.lineWidth = 3;
   		context.strokeStyle = '#FF3030';
		context.stroke();
	}
			
	model.addObserver(this);	
	this.update = function(arg){

		$(".dayActivity").sortable({	
			revert : true,
		    receive : function (event, ui) {
		    	var day = model.days.length-1;
			  	model.moveActivity(null, null, day, day);
				
		    },
				
			change: function (event, ui) {
				dayInfoBox();
				dayInfoBoxStatus();
			},
			connectWith : ".dayActivity, #activitiesContainer"
		});
	}

	
	
}