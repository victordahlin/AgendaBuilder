var ActivitiesController = function(view, model) {
	
	$("#popup").hide();

	view.newActivity.click(
		function(){
			$("#activities").hide();
			$("#popup").show();		
		}
	);
	
	
}