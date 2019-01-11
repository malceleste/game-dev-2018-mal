//initiating variables
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 1023;
canvas.height = 512;

var background = new Image();
background.src = "img/background1.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    context.drawImage(background,0,0);   
}
var score = 0;
var coin_wav = "http://www.soundjay.com/button/beep-07.wav";
var coins_loaded=false;
//loading coin img
var coins = new Image();
coins.src = "img/coin.png";
var coin_locations = [];
class Coin {
    constructor(x, y) {
       this.x = x;
       this.y = y;
     }
 } 
 

//setting game title
context.font = "15px Verdana";
context.fillStyle = "black";
context.fillText("Sorcerers Peril",400,20);

//loading character img
var character = new Image();
character.src = "img/character.png";

//setting default player
var player = { 
	x:0,
	y:20,
	speed:15
};

coinLocations();
playgame();
function getRandomNum(xy) {
	var min = 0;
	var max = 0;
	if(xy == "x"){
    	min = Math.ceil(0);
    	max = Math.floor(1023);
    }else if(xy == "y"){
    	min = Math.ceil(0);
    	max = Math.floor(500);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function loadCoins(){
	for(var i = 0;i<coin_locations.length;i++){
		context.drawImage(coins,0,0,19,22,coin_locations[i].x,coin_locations[i].y,19,22);
	}
}
function coinLocations(){
	var num_coins = 15;
	for(var i = 0;i<num_coins;i++){
		var ran_num_x = getRandomNum("x");
		var ran_num_y = getRandomNum("y");
		coin_locations[i] = new Coin(ran_num_x,ran_num_y);
		
	}
}

function playgame() {
	renderGame();
	requestAnimationFrame(playgame);
}

function renderGame(){
	//redraw background to clear
	context.drawImage(background,0,0);  
	//score title
	context.font = "12px Verdana";
	context.fillStyle = "black";
	context.fillText("Score: "+score,10,20);
	//sorcerer
	context.drawImage(character, 0, 0, 140, 140, player.x, player.y, 140, 140);
	//if(!coins_loaded){
	//	coins_loaded=true;
		loadCoins();
	//}
}
/*
	left1   = parseInt(document.getElementById(my1).style.left)
   right1  = left1 + parseInt(document.getElementById(my1).style.width)
   top1    = parseInt(document.getElementById(my1).style.top)   
   bottom1 = top1   + parseInt(document.getElementById(my1).style.height)
   
   left2   = parseInt(document.getElementById(my2).style.left)
   right2  = left2 + parseInt(document.getElementById(my2).style.width)
   top2    = parseInt(document.getElementById(my2).style.top)   
   bottom2 = top2   + parseInt(document.getElementById(my2).style.height)
   
   if ((right1+25  >=  left2  ) &&      	   
       (bottom1+25 >=  top2   ) &&
       (left1+25   <=  right2 ) &&
       (top1+25    <=  bottom2) ){
       document.getElementById('collision_div').innerHTML='Collision detected';
       return true
   }
   
   
*/
function lookForCollision(){
	//cycle through coins
	for(var i = 0;i<coin_locations.length;i++){
		if (player.x <= (coin_locations[i].x + 19) && coin_locations[i].x <= (player.x + 100) && player.y <= (coin_locations[i].y+ 22) && coin_locations[i].y <= (player.y +97)) {
		
       		var audio = new Audio(coin_wav);
			audio.play();
			score=score+10;
			coin_locations.splice(i,1);
       		return true
   		}
   }
}

//add key listener
var keyclick = {};
document.addEventListener("keydown", function(event) {
	keyclick[event.keyCode] = true;
	move(keyclick);
}, false);
document.addEventListener("keyup", function(event) {
	delete keyclick[event.keyCode];
}, false);

// key functions
function move(keyclick) {
	//check click key value
	if (37 in keyclick) {
		player.x -= player.speed;
	}
	if (38 in keyclick) {
		player.y -= player.speed;
	}
	if (39 in keyclick) {
		player.x += player.speed;
	}	
	if (40 in keyclick) {
		player.y += player.speed;
	}

	// prevent run off screen
	if (player.x >= (canvas.width - 32)) {
		player.x = 0;
	}
	if (player.y >= (canvas.height - 32)) {
		player.y = 0;
	}
	if (player.x < 0) {
		player.x = (canvas.width - 32);
	}
	if (player.y < 0) {
		player.y = (canvas.height - 32);
	}
	lookForCollision();
	renderGame();
	
}