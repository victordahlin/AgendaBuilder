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

			if(name!="" && length!="" && typeid!="" && description!=""){
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
	);
	
}