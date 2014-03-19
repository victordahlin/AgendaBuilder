function DayView(container, model){
	this.model=model;
	
	this.addDayButtonBox = $("#addDayButton");
	
	this.createDay = function(){
		var dayID = model.days.length;
		var dayObject = $("<div>");
		dayObject.attr("id", dayID);
		dayObject.addClass("col-xs-6 col-md-5");		
		
		var dayInfo = $("<div>");
		dayInfo.attr("id", dayID);
		dayInfo.addClass("dayInfo");
		
		var dayStartTime = $("<div>");
		dayStartTime.attr("id", "addDayStartTime");
		dayStartTime.html("Start time:");		
		var dayStartTimeBox = $("<input>");
		dayStartTimeBox.attr("id","addDayStartTimeBox");
		dayStartTimeBox.attr("type","text");	
		dayStartTime.append(dayStartTimeBox);
		dayInfo.append(dayStartTime);		
		
		var dayEndTime = $("<div>");
		dayEndTime.attr("id", "addDayEndTime");
		dayEndTime.html("End time: ");
		var dayEndTimeBox = $("<div>");
		dayEndTimeBox.attr("id", "addDayEndTimeBox");		
		dayEndTime.append(dayEndTimeBox);
		dayInfo.append(dayEndTime);
		
		var dayTotalLength = $("<div>");
		dayTotalLength.attr("id", "dayTotalLength");
		dayTotalLength.html("Total Length: ");
		var totalTimeBox = $("<span>");
		totalTimeBox.attr("id", "dayTotalLengthBox");
		totalTimeBox.html("0");
		dayTotalLength.append(totalTimeBox);
		dayTotalLength.append(" min");
		dayInfo.append(dayTotalLength);
				
		var dayActivity = $("<ul>");
		dayActivity.addClass("dayActivity");	
		dayActivity.attr("id", dayID);

		var dayBreaks = $("<div>");
		dayBreaks.attr("id", "dayBreaks");
		var canvasDiv = $("<canvas>");
		canvasDiv.attr("width","70");
		canvasDiv.attr("height","70");
		canvasDiv.attr("id",dayID);
		canvasDiv.addClass("canvasBox");

		dayBreaks.append(canvasDiv);
		dayInfo.append(dayBreaks);
		dayObject.append(dayInfo, dayActivity);			
		container.append(dayObject);		
	}
		
	this.dayInfoBox = function() {
	
		for(var j = 0; j< this.model.days.length; j++){
			var dayInfo = $("#"+j+" .dayInfo");			
			dayInfo.find("#addDayStartTimeBox").attr("value",this.model.days[j].getStart());
			dayInfo.find("#addDayEndTimeBox").attr("value",this.model.days[j].getEnd());			
			dayInfo.find("#dayTotalLength").html(this.model.days[j].getTotalLength());
		}
	}
	
	this.dayInfoBoxStatus = function() {
		
		for(var j = 0; j< this.model.days.length; j++){
			
			var context = $("#"+j+" .canvasBox").get(0).getContext("2d");
					
			var activityArray = this.model.days[j]._activities; 

			//total box size
			var width = 60;
			var height = 70;

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
			var colors = ["#E0EBFF","#FFD6CC","#D6EAD6","#FFFF66"]
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
				var time = array[i].getLength();

				timeElement.html(time + " min");
				timeElement.attr("id","activityTime");
				timeElement.addClass("col-md-3");

				nameElement.html(name);
				nameElement.addClass(type);
				nameElement.addClass("col-md-8");
				nameElement.attr("id","activityName");

				div.append(timeElement);
				div.append(nameElement);
				dayActivity.append(div);
			}
		}
		
	}
	
	model.addObserver(this);	
	this.update = function(arg){
	if(arg=="moved" || arg=="day"){
		this.dayInfoBox();	
		this.dayInfoBoxStatus();
		this.fillDayActivity();	
	}
	}	
	
	this.createDay(); //init first day
	model.addDay(); 
}