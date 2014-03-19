var DayController = function(view,model) {
	
this.addSortability = function(){
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
				console.log("moved activity to day "+ $(this).attr("id"));
			},
			stop: function (event, ui) {
				if(this === ui.item.parent()[0]){				
				var oldday = $(this).attr("id");
				var newday = $(this).attr("id"); 
				var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				/*console.log("oldday", oldday);
				console.log("newday", newday);
				console.log("oldpos", oldposition);
				console.log("newpos", newposition);*/
				model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition); 
				console.log("moved activity in day");
				}
        	},
            connectWith : ".dayActivity, #activitiesContainer"
     	});
}
	this.addSortability();

	model.addObserver(this);
       
    this.update = function(arg){
	if(arg=="day") this.addSortability();
     }

}