$(document).ready(function() {
	
	var increment;
	var new_increment;
  	
	var children = Lawnchair({name:'children'},function(e){
		console.log('children setup');
	});
	
	var settings = Lawnchair({name:'settings'},function(e){
		console.log('settings setup');
		this.save({key:'child_increment',value:'0'});
	});

	// Handler for .ready() called.
	$('#submit-child').click(function(){
		
		//set autoincrement and save to settings
		settings.get('child_increment',function(obj){
			
			//increment
			var increment = parseInt(obj.value, 10);
			var new_increment = increment+1;
			var increment = new_increment.toString();
			settings.save({key:'child_increment',value:increment});
			
			//save child
			var child_name = $('#name').val();
			var child_obj = {name:child_name,chores:''};
			children.save({key:increment,value:child_obj});
			//children.save({key:increment,value:child});
			
		});

		//turn off button stuff
		return(false);
		
	});
	
	// Handler for .ready() called.
	$('#submit-chore').click(function(){
			
			//save child
			var chore_name = $('#chore').val();
			
			children.get("1",function(thisobj){
				
				var obj = {};
				obj = thisobj.value;
				
				//recrate chores loop and add new chore
				var chores_array = new Array();
				for(var i = 0; i<obj.chores.length;i++) {
					//console.log(obj.chores[i]);
					chores_array.push(obj.chores[i]);
				}
				chores_array.push(chore_name);
				obj.chores = chores_array;
				children.save({key:thisobj.key,value:obj});
				console.log(thisobj);
				
				//empty chore list
				$('#chores_list').empty();
				//add chore list visually
				for(var i = 0; i<obj.chores.length;i++) {
					$('#chores_list').append('<li>'+obj.chores[i]+'</li>');
				}
				
			});

		//turn off button stuff
		return(false);
		
	});
	
	//tabs
	$('#addchore-btn').click(function(){
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('#addchore').fadeIn();
		$('#addchild').css('display', 'none');
	});
	
	//tabs
	$('#addchild-btn').click(function(){
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('#addchild').fadeIn();
		$('#addchore').css('display', 'none');
	});
	
	//nuke all info
	$('#nuke').click(function(){
		children.nuke();
		settings.nuke();
	});

	$('#log').click(function(){
		//get info
		children.all(function(obj){
			console.log(obj);
		});
		settings.all(function(obj){
			console.log(obj);
		});
	});
	
});

