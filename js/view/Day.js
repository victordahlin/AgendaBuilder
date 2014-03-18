function DayView(container, model){
	this.model=model;
	model.addDay(); //could be changed to add day with user input in constructor (above) parameters.
	
	this.dayID = (model.days.length-1);
	
		var dayObject = $("<div>");
		dayObject.attr("id", this.dayID);
		dayObject.addClass("col-xs-8 col-md-3");		
		
		var dayInfo = $("<div>");
		dayInfo.attr("id", "dayInfo");
		

		var dayStartTime = $("<div>");
		dayStartTime.attr("id", "addDayStartTime");
		dayStartTime.html("Start time:");
		/*this.dayStartTimeBox = $("<div>");
		this.dayStartTimeBox.attr("id", "addDayStartTimeBox");
		this.dayStartTimeBox.html(model.days[this.dayID].getStart());*/
		this.dayStartTimeBox = $("<input>");
		this.dayStartTimeBox.attr("id","addDayStartTimeBox");
		this.dayStartTimeBox.attr("type","text");
		this.dayStartTimeBox.attr("value", model.days[this.dayID].getStart());

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
		//dayTotalLength.append(" min");
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
	
	this.dayInfoBox = function() {

		this.dayStartTimeBox.attr("value", this.model.days[this.dayID].getStart());
		/*this.dayStartTimeBox.html(this.model.days[this.dayID].getStart());*/
		this.dayEndTimeBox.html(this.model.days[this.dayID].getEnd());
		this.totalTime.html(this.model.days[this.dayID].getTotalLength() + " min");
	}
	this.dayInfoBox(); // init

	this.dayInfoBoxStatus = function() {
		
  	   	var context = this.canvasDiv.get(0).getContext("2d");
    	var activityArray = this.model.days[this.dayID]._activities; 

		//total box size
		var width = 60;
		var height = 70;

		//box start coordinates
		var x = 5;
		var y = 0;

		var totalLength = model.days[this.dayID].getTotalLength();

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
		this.dayInfoBox(); //init
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

	this.fillDayActivity = function(){
		this.dayActivity.empty();
		var array = this.model.days[this.dayID]._activities;			
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
			this.dayActivity.append(div);
			console.log("Filled dayActivity");
		}
	}

	//should be in controller?
	this.dayStartTimeBox.blur(
		function(){
		console.log("onblur");
		var time = $(this).val().split(":");
		console.log(model.days[this.dayID]);
		model.days[this.dayID].setStart(time[0],time[1]);	
		console.log(model.days[this.dayID].getStart());	
	});


	model.addObserver(this);	
	this.update = function(arg){
		this.dayInfoBox();
		this.dayInfoBoxStatus();

		if(arg == this.dayID){
			this.fillDayActivity();
			}
	}	
}