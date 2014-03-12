var AddActivityController = function(view, model) {

	view.cancelButton.click(
		function(){
			$("#popup").hide();	
			$("#activitiesContainer").show();
			$("#addButtonContainer").show();
			//$("#dayContainer").show();
			//$("#addDayButton").show();
			//console.log("cancel");
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
				var day = model.days.length-1;
				
				//model.addActivity(act,day);
				model.addParkedActivity(act);
				
				$("#popup").hide();
				$("#activitiesContainer").show();
				$("#addButtonContainer").show();
			}
			else{
				alert("Fill all o' them boxes");
			}
		}
	);
	
}