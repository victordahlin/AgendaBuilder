var AddDayController = function(view,model) {

console.log(view);

	view.addDayButtonBox.click( function(){ 
		model.addDay(); //could be changed to add day with user input.
		view.createDay();
		//var day = new DayView($("#dayContainer"), model);
		console.log(view);
	});	

	model.addObserver(this);
       
    this.update = function(arg){
    	$(".dayActivity").sortable({   
        	revert : true,
                      
            update: function (event, ui) {     
            	var oldday = null;
                if(ui.sender != null){
                	oldday = ui.sender.attr("id");
                    	if(oldday == "activitiesContainer"){
                        	oldday = null;
                        }
                }
                var newday = $(this).attr("id");
                var oldposition = ui.item.data("position");
                var newposition = ui.item.index();
                console.log("ui",ui);
                console.log("event",event);
                console.log("oldday",oldday);
                console.log("newday",newday);
                console.log("oldpos",oldposition);
                console.log("newpos",newposition);                       
                model.moveActivity(oldday, oldposition, newday, newposition);
        	},
            connectWith : ".dayActivity, #activitiesContainer"
     	});
     }

}