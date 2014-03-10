var DayView = function (container, model){
	
	this.dayID = (model.days.length-1);
	console.log("dayID " + this.dayID);

	var dayObject = $("<div>");
	dayObject.attr("id", this.dayID);
	dayObject.addClass("col-md-3");		
	
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

			
	model.addObserver(this);
	
	this.update = function(arg){
	
		//console.log(model.days[this.dayID].getStart());
		//console.log(model.days[this.dayID].getEnd());
		//console.log(model.days[this.dayID].getTotalLength());

		$(".dayActivity").sortable({	
			//http://api.jqueryui.com/sortable/#event-change
			revert : true,
		    receive : function (event, ui) {
		    	var day = model.days.length-1;
		    	console.log(ui.item.html());
			  	model.moveActivity(null, null, day, day);
			  	//model.moveActivity(e.target, ui.draggable.id, view.dayID, ???);
			
		    },
			change: function (event, ui) {
			
			console.log(ui.originalPosition);
			console.log(ui.position);	//coordinates - blההההההההה
			console.log(ui.sender); //null if from same container
			
			var day = model.days.length-1;
			$("#addDayStartTimeBox").html(model.days[day].getStart());
			$("#addDayEndTimeBox").html(model.days[day].getEnd());
			$("#dayTotalLengthBox").html(model.days[day].getTotalLength());	


			/**************/
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

			/**************/

			//model.moveActivity(oldday, oldposition, newday, newposition)
			//model.moveActivity(e.target, ui.draggable.id, view.dayID, ???);
			},
			connectWith : ".dayActivity, #activitiesContainer"
		});
	}

	
	
}