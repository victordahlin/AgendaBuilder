function DayView(container, model){
	this.model=model;
	
	this.addDayButtonBox = $("#addDayButton");
	
	this.createDay = function(dayID){
		//var dayID = model.days.length-1;

		var dayObject = $("<div>");
		dayObject.attr("id", dayID);
		var dayLabel = $("<label>");
		dayLabel.attr("id", "dayLabel");
		dayLabel.text("Day "+(dayID+1));
		dayObject.append(dayLabel);
		dayObject.addClass("dayObject col-xs-12 col-sm-6 col-md-4");		
		
		var dayInfo = $("<div>");
		dayInfo.attr("id", dayID);
		dayInfo.addClass("dayInfo row");
		

		//left column
		var leftColumn = $("<div>");
		leftColumn.addClass("col-xs-8")
		leftColumn.attr("id", "leftColumn");
		
		//start time
		var dayStartTime = $("<div>");
		dayStartTime.addClass("form-group form-inline");
		dayStartTime.attr("id", "dayStartTime");
		var label = $("<label>");
		label.attr("for","dayStartTimeBox");
		label.html("Start time:");
		var dayStartTimeBox = $("<input>");
		dayStartTimeBox.addClass("form-control input-sm pull-right");
		dayStartTimeBox.attr("id","dayStartTimeBox");
		dayStartTimeBox.attr("type","text");
		dayStartTimeBox.data("dayID", dayID);
		dayStartTime.append(label);
		dayStartTime.append(dayStartTimeBox);
		leftColumn.append(dayStartTime);

		//end time 
		var dayEndTime = $("<div>");
		dayEndTime.addClass("form-group");
		dayEndTime.attr("id", "addDayEndTime");
		var label = $("<label>");
		label.attr("for","addDayEndTimeBox");
		label.html("End time:");	
		var dayEndTimeBox = $("<span>");
		dayEndTimeBox.addClass("pull-right");
		dayEndTimeBox.attr("id", "addDayEndTimeBox");
		dayEndTime.append(label);
		dayEndTime.append(dayEndTimeBox);
		leftColumn.append(dayEndTime);
		
		//total length
		var dayTotalLength = $("<div>");
		dayTotalLength.addClass("form-group");
		dayTotalLength.attr("id", "dayTotalLength");
		var label = $("<label>");
		label.attr("for","dayTotalLengthBox");
		label.html("Total minutes");	
		var totalTime = $("<span>");
		totalTime.addClass("pull-right");
		totalTime.attr("id", "dayTotalLengthBox");

		dayTotalLength.append(label);
		dayTotalLength.append(totalTime);
		leftColumn.append(dayTotalLength);


		var dayBreaks = $("<div>");
		dayBreaks.attr("id", "dayBreaks");
		var canvasDiv = $("<canvas>");
		canvasDiv.attr("width","70");
		canvasDiv.attr("height","70");
		canvasDiv.attr("id",dayID);
		canvasDiv.addClass("canvasBox");

		dayBreaks.append(canvasDiv);
		var rightColumn = $("<div>");
		rightColumn.addClass("col-xs-4")
		rightColumn.attr("id", "rightColumn");

		//rightColumn.append(deleteDayButton);
		rightColumn.append(dayBreaks);
		dayInfo.append(leftColumn,rightColumn);

		var dayActivity = $("<ul>");
		dayActivity.addClass("dayActivity row");	
		dayActivity.attr("id", dayID);

		dayObject.append(dayInfo, dayActivity);			
		container.append(dayObject);		
	}
		
	this.dayInfoBox = function() {
		for(var j = 0; j< this.model.days.length; j++){
			var dayInfo = $("#"+j+" .dayInfo");			
			dayInfo.find("#dayStartTimeBox").attr("value",this.model.days[j].getStart());
			dayInfo.find("#addDayEndTimeBox").html(this.model.days[j].getEnd());			
			dayInfo.find("#dayTotalLengthBox").html(this.model.days[j].getTotalLength());
		}
	}
	
	this.dayInfoBoxStatus = function() {
		for(var j = 0; j< this.model.days.length; j++){
			var canvas = $("#"+j+" .canvasBox");

			var context = canvas.get(0).getContext("2d");
			var activityArray = this.model.days[j]._activities; 
			
			//total box size
			var width = 60;
			var height = 70;

			context.clearRect(0,0,70,70);

			//box start coordinates
			var x = 5;
			var y = 0;


			var totalLength = model.days[j].getTotalLength();

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
			var colors = ["#E0EBFF","#FFD6CC","#CCCCCC","#99D6AD"]
			for (var i=0; i < totalLength; i++){
				context.beginPath();
				context.rect(x, y, width, height);
				context.fillStyle= colors[i];
				context.fill();
				y = y + array[i];
			}

				//red line
			if (totalLength != 0) {
				y = height*0.7;
				context.beginPath();
				context.moveTo(0,y);
				context.lineTo(70,y);
				context.lineWidth = 3;
				context.strokeStyle = '#FF3030';
				context.stroke();
			} 
		}
	}

	this.fillDayActivity = function(){	
		for(var j = 0; j< this.model.days.length; j++){
		
			var dayActivity = $("#"+j+".dayActivity");
			var startTime = this.model.days[j].getStart().split(":");
			startTime[0] = parseInt(startTime[0]);
			startTime[1] = parseInt(startTime[1]);
			 			
			dayActivity.empty();
			var array = this.model.days[j]._activities;			
			for( var i = 0; i < array.length; i++ ) {
				var div = $("<li>");
				var timeElement = $("<div>");
				var nameElement = $("<div>");

				div.attr("id","activity");
				div.data("start_pos", i)
				div.addClass("activityObject");

				var name = array[i].getName();
				var type = array[i].getType();			
				var time = parseInt(array[i].getLength());

				timeElement.html(formatTime(startTime));
				timeElement.attr("id","activityTime");
				timeElement.addClass("col-xs-4");

				nameElement.html(name);
				nameElement.addClass(type);
				nameElement.addClass("col-xs-8");
				nameElement.attr("id","activityName");
			
				div.append(timeElement);
				div.append(nameElement);
				dayActivity.append(div);
				
				startTime[0]+= Math.floor((time/60)+(startTime[1]/60));
				startTime[1]=(startTime[1]+time)%60;				
			}
		}
		
	}
	
	var formatTime = function(startTime){
		
		var hh = startTime[0];
		var min = startTime[1];		
		if(hh < 10) hh = "0"+startTime[0];
		if(min < 10) min = "0"+startTime[1];
		
		return hh+":"+min;
	}
	
	model.addObserver(this);	
	this.update = function(arg){
		
		if(arg=="moved"|| arg=="day"){
			this.dayInfoBox();	
			this.dayInfoBoxStatus();
			this.fillDayActivity();	
		}
	}
}