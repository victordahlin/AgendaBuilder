//main controller
//handles the main interaction between "screens" and popups, ie. showing and hiding containers.

/*
Hides the popup in the left container in planner used for creating and editing of activities.
The provided type filters which buttons are shown in the popup.  
*/
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
/*
Hides the popup in the left container in planner used for creating and editing of activities.
*/
function hidePopup(type){	
	$("#activitiesContainer").show();
	$("#addButtonContainer").show();
	$("#addDayButton").show();
	$("#popup").hide();
	$("#updateActivity").hide();
}

/*
Shows the planner screen where all planning takes place and hides start page.
*/
function showPlanner(){
	$("#planner").show();
	$("#startPage").hide();	
}
/*
Hides the planner screen where all planning takes place.
*/
function hidePlanner(){	
	$("#planner").hide();
}

	/*
	Start modal box and hide buttons 
	*/
function showModalBox() {
	$('#modalBox').modal('toggle');
	$("#myModalLabel").html("");
	$("#modalButtonCancel").hide();
	$("#modalButtonRemove").hide();
	$("#modalButtonOK").show();
}

hidePlanner();