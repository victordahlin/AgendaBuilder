var AddActivityController = function(view, model) {
	console.log("hej");
	view.cancelButton.click(
		function(){
			$("#popup").hide();	
			$("#activities").show();
			console.log("cancel");

		}
	);
	
	view.saveButton.click(
		function(){
			//console.log(name);
			var name = $("#name").val();
			var length = $("#length").val();
			var typeid = $("#typeid").val();
			console.log(typeid);
			var description = $("#description").val();
			var act = new Activity(name,length,typeid,description);
			model.addParkedActivity(act);
			$("#popup").hide();
			$("#activities").show();
		}
	);
	
}