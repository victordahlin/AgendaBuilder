var ActivitiesController = function(view, model) {

	view.newActivity.click(
		function(){
			$("#name").val("");
			$("#length").val("");
			$("#typeid").val("");
			$("#description").val("");
			showPopup("create");

		}
	);
	
	view.activities.sortable({
			items : "> li",	
        	revert : true,
                      
            receive: function (event, ui) {     
                var oldday = ui.sender.attr("id");
               	var newday = null;
                var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				
                model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition);
        	},
            connectWith : ".dayActivity, #activitiesContainer"			
     	});

		
	model.addObserver(this);
	this.update = function(arg){
		
		switch (arg) {
		case "day" : $( "#activitiesContainer" ).sortable( "option", "connectWith", ".dayActivity, #activitiesContainer" );
		break;
		default : view.fillActivities(); 
				$("#activitiesContainer").sortable( "refresh" );				
		}
	}
}