var AddActivityController = function(view, model) {

	hidePopup();

	// When user press cancel the activities will show
	// and hides the popup box
	view.cancelButton.click(hidePopup);
	

	// When user press save this function will grab values
	// check user input and if everything is correct a new 
	// activity will be created
	view.saveButton.click(
		function(){
			var name = $("#name").val();
			var length = $("#length").val();
			var typeid = $("#typeid").val();
			var description = $("#description").val();

   			if((parseFloat(length) == parseInt(length)) && !isNaN(length) && parseInt(length) >= 0){

				if(name!="" && length!="" && typeid!="" && typeid != null){
					var act = new Activity(name,length,typeid,description);
					model.addParkedActivity(act);
					
					$("#popup").hide();
					$("#activitiesContainer").show();
					$("#addButtonContainer").show();
					$("#addDayButton").show();
				}
				else{
					$('#modalBox').modal('toggle');
					$("#myModalLabel").html("");
					$("#modalBody").html("Fill all of the boxes with valid data please");
					$("#modalButtonCancel").hide();
					$("#modalButtonRemove").hide();
					$("#modalButtonOK").show();
				}
			}
			else { 
				$('#modalBox').modal('toggle');
				$("#myModalLabel").html("");
				$("#modalBody").html("Fill all of the boxes with valid data please");
				$("#modalButtonCancel").hide();
				$("#modalButtonRemove").hide();
				$("#modalButtonOK").show();
		
			}
		}
	);	
}