var DayController = function(view,model) {
	
// Nått buggar?
	$(".dayActivity").sortable({   
        	revert : true,
                      
            receive: function (event, ui) {     
                var oldday = ui.sender.attr("id");
                	if(oldday == "activitiesContainer"){
                    	oldday = null;
                    }               
                
				var newday = $(this).attr("id");
                var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				/*console.log("oldday", oldday);
				console.log("newday", newday);
				console.log("oldpos", oldposition);
				console.log("newpos", newposition);*/
                model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition);
				console.log("moved activity to day "+view.dayID);
        	},
			stop: function (event, ui) {
				if(ui.sender == null){
				console.log("triggered update");
				var oldday = view.dayID;
				var newday = view.dayID;; 
				var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				/*console.log("oldday", oldday);
				console.log("newday", newday);*/
				console.log("oldpos", oldposition);
				console.log("newpos", newposition);
				model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition); 
				console.log("moved activity in day");
				}
        	},
            connectWith : ".dayActivity, #activitiesContainer"
     	});


	view.dayStartTimeBox.blur(
		function(){
		console.log("onblur");
		var time = $(this).val().split(":");
		model.days[view.dayID].setStart(time[0],time[1]);	
		console.log(this.model.days[view.dayID].getStart());	
	});

	model.addObserver(this);
       
    this.update = function(arg){
	if(arg=="day") $( ".dayActivity" ).sortable( "option", "connectWith", ".dayActivity,#activitiesContainer" );
     }

}