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

function showHelpPopup(){
	showModalBox();
	
	var header = $("<h4>");
	header.html("Welcome to Agenda Builder!");
	var text = $("<p>");
	text.append("</br>");
	text.append("Create acitivities in the panel to the left and drag them into the day panels to build your agenda.");
	text.append("</br></br>");
	text.append("The length of an activity should not span over multiple days and cannot be negative.")
	text.append("</br></br>");
	text.append("To create a new day press the Add day-button."); 
	text.append("</br></br>");
	text.append("After creation of a day you may set the start time of a day to time in HH:MM format.");
	text.append("</br></br>");
	text.append("You cannot not set the start time causing the length of the agenda for that day to span multiple days.");
	text.append("</br>");
	text.append("For the same reason you cannot drag an activity such that then end time of the day dragged exceeds midnight.");
	text.append("</br></br>");
	var end = $("<p>");
	end.html("Happy planning!");
	$("#modalBody").html("");
	$("#modalBody").append(header,text,end);
}

hidePlanner();