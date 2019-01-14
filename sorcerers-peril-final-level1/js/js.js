sprites.addObjects({
  "player": [42, 513, 140, 140],
  "background": [0, 0, 1024, 712]
});

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var score = 0;

//setting game title
context.fillText("Sorcerers Peril",10,10);
//loading img sprite
image = new Image();
image.ready = false;
image.onload = checkReady;
image.src = "img/sprite.png";

var player = { 
	x:0,
	y:20,
	playx:42,
	playy:513,
	psizew:25,
	psizeh:25,
	width:140,
	height:140,
	speed:5
};
function checkReady(){
	this.ready = true;
	playgame();
}

function playgame() {
	renderGame();
	requestAnimationFrame(playgame);
}

function renderGame(){
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height);
	//context.drawImage(image,0,0,0,0,1024,712);
	//sorcerer
	context.drawImage(image,player.playx,player.playy,player.width,player.height,player.x,player.y,player.psizew,player.psizeh);
	context.font = "20px Verdana";
	context.fillStyle = "black";
	context.fillText("Score: "+score,0,0);
	
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
		player.pacdir = 64;
	}
	if (38 in keyclick) {
		player.y -= player.speed;
		player.pacdir = 96;
	}
	if (39 in keyclick) {
		player.x += player.speed;
		player.pacdir = 0;
	}	
	if (40 in keyclick) {
		player.y += player.speed;
		player.pacdir = 32;
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
	//open close mouth
	if (player.pacmouth == 320) {
		player.pacmouth = 352;
	} else {
		player.pacmouth = 320;
	}
	renderGame();

}
