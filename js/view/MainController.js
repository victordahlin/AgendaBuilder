//main controller
//handles the main interaction beetween "screens" and popups, ie. showing and hiding containers.


function showPopup(type){
	$("#activitiesContainer").hide();
	$("#addButtonContainer").hide();
	$("#addDayButton").hide();	
	$("#popup").show();	
	$("#cancelActivity").show();
	if(type=="update"){
		$("#deleteActivity").show();
		$("#updateActivity").show();
		$("#saveActivity").hide();
	}else if(type=="create"){
		$("#deleteActivity").hide();
		$("#updateActivity").hide();
		$("#saveActivity").show();
	}

}

function hidePopup(type){	
	$("#activitiesContainer").show();
	$("#addButtonContainer").show();
	$("#addDayButton").show();
	$("#popup").hide();
	$("#updateActivity").hide();
}

function showPlanner(){
	$("#planner").show();
	$("#startPage").hide();	
}

function hidePlanner(){	
	$("#planner").hide();
}

hidePlanner();