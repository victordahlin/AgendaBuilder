var AddDayController = function(view,model) {
	var oldday, newDay, oldposition, newposition = 0;

	console.log(view);

	view.addDayButtonBox.click( function(){ 
		model.addDay(); //could be changed to add day with user input.
		view.createDay();
		//var day = new DayView($("#dayContainer"), model);
	});	

	// Nått buggar?
	$(".dayActivity").sortable({   
        	revert : true,
                      
            update: function (event, ui) {     
                /*
                if(ui.sender != null){
                	oldday = ui.sender.attr("id");
                	if(oldday == "activitiesContainer"){
                    	oldday = null;
                    }
                } */
                oldday = view.dayID;
                newday = $(this).attr("id");
                oldposition = ui.item.data("start_pos");
                newposition = ui.item.index();
                //console.log("ui",ui);
                //console.log("event",event);
                console.log("oldday",oldday);
                console.log("newday",newday);
                console.log("oldpos",oldposition);
                console.log("newpos",newposition);                       
               
                model.moveActivity(oldday, oldposition, newday, newposition);
                view.dayInfoBox(newDay);
                view.dayInfoBoxStatus(newDay);

                ui.item.data("start_pos", newposition);
        	},
            connectWith : ".dayActivity, #activitiesContainer"
     	});

	model.addObserver(this);
       
    this.update = function(arg){

     }

}