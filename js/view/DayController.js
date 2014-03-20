var DayController = function(view,model) {


//adds sortable functionality to .dayActivity lists in newly created days
//if lists an activity is received by/dropped in the list, the model is updated to move the activity.
//when sorting stops and if activity is moved inside list the model is updated accordingly.
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
                model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition);
				//console.log("moved activity to day "+ newday);	//for debug
			},
			stop: function (event, ui) {
				if(this === ui.item.parent()[0]){				//if moved in the same list
				var oldday = $(this).attr("id");
				var newday = $(this).attr("id"); 
				var oldposition = ui.item.data("start_pos");
                var newposition = ui.item.index();
				model.moveActivity(oldday, oldposition, newday, newposition);                

                ui.item.data("start_pos", newposition); 
				console.log("moved activity in day from" + oldposition +" to "+ newposition); //for debug
				}
        	},
            connectWith : ".dayActivity, #activitiesContainer"
     	});
}

/*$(document).on("click","#deleteDay",function(){
	//do confirm prompt
	//jConfirm('Are you sure you want to remove this day?', 'Confirmation Dialog', function() {
		
		var dayID = $(this).val();		
		console.log($("#"+dayID+".dayObject"));
		$("#"+dayID+".dayObject").remove();		//should be removed
		model.removeDay(dayID);
	//});
});*/

	this.addSortability();

	model.addObserver(this);
       
    this.update = function(arg){
	if(arg=="day") this.addSortability();
     }

}