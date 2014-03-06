var ActivitiesController = function(view, model) {
	
	$("#popup").hide();

	view.newActivity.click(
		function(){
			$("#name").val("");
			$("#length").val("");
			$("#typeid").val("");
			$("#description").val("");
			$("#activities").hide();
			$("#popup").show();

		}
	);
	
	
}