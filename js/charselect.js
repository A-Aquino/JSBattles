//Global Variables
var player = "Swordsman";
var enemy = "Slime";

//Ready
$( document ).ready(function() {
	
	//Start button
	$('#start').click(function(){
		window.location.href="battle.html#"+player+"#"+enemy;
	});
	
	//Player selector
	$("#playertitle").change(function(){
		player = $(this).val();
		$("#player").css("background-image","url(img/"+player+".png)");
		$("#title").text(player+" vs. "+enemy);
	});
	
	//Enemy selector
	$("#enemytitle").change(function(){
		enemy = $(this).val();
		$("#enemy").css("background-image","url(img/"+enemy+".png)");
		$("#title").text(player+" vs. "+enemy);
	});
	
	
});