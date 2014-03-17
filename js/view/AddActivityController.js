var AddActivityController = function(view, model) {

	view.cancelButton.click(
		function(){
			$("#popup").hide();	
			$("#activitiesContainer").show();
			$("#addButtonContainer").show();
			$("#addDayButton").show();
			
		}
	);
	
	view.saveButton.click(
		function(){
			var name = $("#name").val();
			var length = $("#length").val();
			var typeid = $("#typeid").val();
			var description = $("#description").val();


   			if((parseFloat(length) == parseInt(length)) && !isNaN(length)){

				if(name!="" && length!="" && typeid!=""){
					var act = new Activity(name,length,typeid,description);
					model.addParkedActivity(act);
					
					$("#popup").hide();
					$("#activitiesContainer").show();
					$("#addButtonContainer").show();
					$("#addDayButton").show();
				}
				else{
					alert("Fill all o' them boxes");
				}
			}
			else { 
				alert("Length must be a whole number")}
		}
	);
	
}