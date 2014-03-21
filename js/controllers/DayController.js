var DayController = function(view,model) {


//adds sortable functionality to .dayActivity lists in newly created days
//if lists an activity is received by/dropped in the list, the model is updated to move the activity.
//when sorting stops and if activity is moved inside list the model is updated accordingly.
this.addSortability = function(){
	$(".dayActivity").sortable({   
		revert : true,
		
		receive: function (event, ui) {     
			var oldday = ui.sender.attr("id");
			var newday = $(this).attr("id");
			var oldposition = ui.item.data("start_pos");
			var newposition = ui.item.index();
			var activityLength = 0;

			if(oldday == "activitiesContainer"){
				oldday = null;
				activityLength = model.parkedActivities[oldposition].getLength();
			}else{
				activityLength = model.days[oldday]._activities[oldposition].getLength();
			}
			
			if(model.checkEndTime(newday, activityLength, "receive")){
				model.moveActivity(oldday, oldposition, newday, newposition); 
				ui.item.data("start_pos", newposition);
			}else {
				showModalBox();
				$("#modalBody").html("This day ain't long enough!");
				ui.item.appendTo(ui.sender);
				model.moveActivity(oldday, oldposition, oldday, oldposition); 
			}						
		},
		
		stop: function (event, ui) {
			if(this === ui.item.parent()[0]){
				var oldday = $(this).attr("id");
				var newday = $(this).attr("id"); 
				var oldposition = ui.item.data("start_pos");
				var newposition = ui.item.index();
				model.moveActivity(oldday, oldposition, newday, newposition);
				ui.item.data("start_pos", newposition); 					
			}
		},
		connectWith : ".dayActivity, #activitiesContainer"
	});
}

//Function for changing time of the day, when focus is lost on input element. After validating,
// a new start time is set in the model.
$(document).on("blur","#dayStartTimeBox", function(){
	var dayID = $(this).data("dayID");
	var isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])?$/.test($(this).val());

	if (isValid){
		var time = $(this).val().split(":");
		if ( model.checkEndTime(dayID, (parseInt(time[0])*60 + parseInt(time[1])),"changeTime")){
			model.changeStartTime(dayID, time[0],time[1]);
		}else{     
        	// Method from ActivitiesController   
        	showModalBox();
        	$("#modalBody").html("This day ain't long enough!");
        }
    }else{
			// Method from ActivitiesController  
			showModalBox();
			$("#modalBody").html("Must be in format [hh:mm]");
		}
	});

this.addSortability();

model.addObserver(this);

this.update = function(arg){
	if(arg=="day") this.addSortability();
}

}