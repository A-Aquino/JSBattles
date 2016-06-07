//Global Variables
var player;
var enemy;

//Important Elements
var playerhealth;
var enemyhealth;
var battlenotes;
var attacklist;

//Attack List (JSON defining all attacks for all class types)
var attacks = {
	//Player Classes
	'Swordsman': ['Slash','Stab','Dodge'],
	'Archer': ['Shoot','Defend','Dodge'],
	'Mage': ['Fireball','Thunder','Heal'],
	'Knight': ['Stab','Defend'],

	//Enemies
	'Slime':['Slash','Dodge','Heal'],
	'Goblin':['Slash','Shoot','Defend'],
	'Bat':['Slash','Dodge'],
	'Mimic':['Fireball','Thunder','Dark Arts'],
	'Witch':['Thunder','Dark Arts','Heal'],
	'Dragon':['Stab','Thunder','Defend'],
	'Wyvern':['Stab','Dark Arts','Defend'],
};

//Make Attack Buttons
var makeattacks = function() {
	var thearray = attacks[player];
	for(var i=0;i<thearray.length;i++)
		makebutton(thearray[i]);
}

//Health Values
var playerhp = 1000;
var enemyhp = 1000;

//Defend Flags
var playerdefend = 0;
var enemydefend = 0;

//Update player health
var updatephealth = function(v) {
	if(v<0) {
		if(playerdefend==1) {v = Math.floor(v/4)};
		if(playerdefend==2) {if(Math.random() > 0.5) v = 0;}
		var t = "Dealt " + Math.abs(v) + " damage.";
		if(playerdefend===1) t+=" "+player+" defended the attack!";
		if(playerdefend===2&&v!==0) t+=" "+player+" attempted to dodge, but failed!";
		if(playerdefend===2&&v===0) t+=" "+player+" successfully dodged the attack!";
		playerdefend = 0;
	}
	playerhp += v;
	if(playerhp<0) playerhp = 0;
	if(playerhp>1000) playerhp = 1000;
	playerhealth.text(playerhp);
	return t;
}

//Update enemy health
var updateehealth = function(v) {
	if(v<0) {
		if(enemydefend==1) {v = Math.floor(v/4)};
		if(enemydefend==2) {if(Math.random() > 0.5) v = 0;}
		var t = "Dealt " + Math.abs(v) + " damage.";
		if(enemydefend===1) t+=" "+enemy+" defended the attack!";
		if(enemydefend===2&&v!==0) t+=" "+enemy+" attempted to dodge, but failed!";
		if(enemydefend===2&&v===0) t+=" "+enemy+" successfully dodged the attack!";
		enemydefend = 0;
	}
	enemyhp += v;
	if(enemyhp<0) enemyhp = 0;
	if(enemyhp>1000) enemyhp = 1000;
	enemyhealth.text(enemyhp);
	return t;
}

//Update Battle Notes
var updatenotes = function(t) {
	battlenotes.text(t);
}

//Pick a random enemy move
var pickenemymove = function() {
	var thearray = attacks[enemy];
	return thearray[Math.floor(Math.random()*thearray.length)];
}

//Handle all button presses
var buttonpress = function(t) {
	
	//Remove Buttons
	attacklist.empty();
	
	//Check End State
	if(t==="Battle End"||t==="Game Over") {
		window.location.href="index.html";
		return
	}
	
	//Check Health
	if(enemyhp===0) {
		updatenotes(player+" wins the battle!");
		makebutton("Battle End");
		return
	}
	if(playerhp===0) {
		updatenotes(player+" died!");
		makebutton("Game Over");
		return
	}
	
	//Continue
	if(t==="Continue") {
		
		//Pick enemy moves
		t = pickenemymove();

		//Smarter AI
		while( (enemydefend>0&&(t==="Dodge"||t==="Defend")) || (enemyhp===1000&&t==="Heal") )
			t = pickenemymove();
		
		//Enemy moves
		if(t==="Slash") {
			updatenotes(enemy+" used Slash. "+updatephealth(-200 +Math.floor(Math.random()*20-10) ));
		}
		if(t==="Stab") {
			if(Math.random() > 0.5)
				updatenotes(enemy+" used Stab. "+updatephealth(-400 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(enemy+" used Stab, and missed.");
		}
		if(t==="Shoot") {
			if(Math.random() > 0.25)
				updatenotes(enemy+" used Shoot. "+updatephealth(-300 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(enemy+" used Shoot, and missed.");
		}
		if(t==="Dodge") {
			updatenotes(enemy+" prepares to dodge an attack.");
			enemydefend=2;
		}
		if(t==="Defend") {
			updatenotes(enemy+" prepares to defend an attack.");
			enemydefend=1;
		}
		if(t==="Fireball") {
			if(Math.random() > 0.25)
				updatenotes(enemy+" used Fireball. "+updatephealth(-300 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(enemy+" used Fireball, and missed.");
		}
		if(t==="Thunder") {
			if(Math.random() > 0.75)
				updatenotes(enemy+" used Thunder. "+updatephealth(-500 +Math.floor(Math.random()*40-20) ));
			else
				updatenotes(enemy+" used Thunder, and missed.");
		}
		if(t==="Heal") {
			var heal = 200+Math.floor(Math.random()*150-100);
			updatenotes(enemy+" used Heal, and recovered "+heal+" HP!");
			updateehealth(heal);
		}
		if(t==="Dark Arts") {
			if(Math.random() > 0.85)
				updatenotes(enemy+" used Dark Arts. "+updatephealth(-800 +Math.floor(Math.random()*300-150) ));
			else
				updatenotes(enemy+" used Dark Arts, and missed.");
		}
		if(playerhp>0)
			makeattacks();
		else
			makebutton("Continue");
	}
	
	//Player moves
	else {
		if(t==="Slash") {
			updatenotes(player+" used Slash. "+updateehealth(-200 +Math.floor(Math.random()*20-10) ));
		}
		if(t==="Stab") {
			if(Math.random() > 0.5)
				updatenotes(player+" used Stab. "+updateehealth(-400 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Stab, and missed.");
		}
		if(t==="Shoot") {
			if(Math.random() > 0.25)
				updatenotes(player+" used Shoot. "+updateehealth(-300 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Shoot, and missed.");
		}
		if(t==="Dodge") {
			updatenotes(player+" prepares to dodge an attack.");
			playerdefend=2;
		}
		if(t==="Defend") {
			updatenotes(player+" prepares to defend an attack.");
			playerdefend=1;
		}
		if(t==="Fireball") {
			if(Math.random() > 0.25)
				updatenotes(player+" used Fireball. "+updateehealth(-300 +Math.floor(Math.random()*30-15) ));
			else
				updatenotes(player+" used Fireball, and missed.");
		}
		if(t==="Thunder") {
			if(Math.random() > 0.75)
				updatenotes(player+" used Thunder. "+updateehealth(-500 +Math.floor(Math.random()*40-20) ));
			else
				updatenotes(player+" used Thunder, and missed.");
		}
		if(t==="Heal") {
			var heal = 200+Math.floor(Math.random()*150-100);
			updatenotes(player+" used Heal, and recovered "+heal+" HP!");
			updatephealth(heal);
		}
		makebutton("Continue");
	}
}

//Make Button
var makebutton = function(t) {
	var button = $('<button/>',{
		text: t,
		click: function () { buttonpress(t); }
	}).addClass("btn btn-lg btn-default");
	attacklist.append(button);
};

//Ready
$( document ).ready(function() {
	
	//Get arguments
	var args = window.location.hash.split("#");
	player = args[1];
	enemy = args[2];
	
	//Get important elements
	playerhealth = $("#playerhealth");
	enemyhealth = $("#enemyhealth");
	battlenotes = $("#battlenotes");
	attacklist = $("#attacklist");
	
	//Update text
	battlenotes.text("A wild " + enemy + " appears!");
	$("#playertitle").text(player);
	$("#enemytitle").text(enemy);
	$("#title").text("JSBattles - "+player+" vs. "+enemy);
	
	//Load images
	$("#player").css("background-image","url(img/"+player+".png)");
	$("#enemy").css("background-image","url(img/"+enemy+".png)");
	
	//Begin battle
	makeattacks();
	
});