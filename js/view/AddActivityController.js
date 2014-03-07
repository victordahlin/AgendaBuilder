var AddActivityController = function(view, model) {
	//console.log("hej");
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
			var description = $("#description").val();

			if(name!="" && length!="" && typeid!="" && description!=""){
				var act = new Activity(name,length,typeid,description);
				model.addParkedActivity(act);
				$("#popup").hide();
				$("#activities").show();
			}
			else{
				alert("Fill all o' them boxes");
			}
		}
	);
	
}