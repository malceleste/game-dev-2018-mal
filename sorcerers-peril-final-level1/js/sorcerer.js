//initiating variables
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var sprite_json = '{"ranges": [[0,35, 0,31],[42,47,0,31]]}';
var score = 0;
var coin_wav = "http://www.soundjay.com/button/beep-07.wav";
var coins_loaded=false;
//loading coin img
var coins = new Image();
coins.src = "img/coin.png";
var coin_locations = [];
var pitch = 5;//pitch of jump - pitch*xy
var speed = 10;//impact height
canvas.width = 1023;
canvas.height = 512;
var jumping=false;
var falling=false;
var released=false;
var left=false;
var right=false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

class Coin {
    constructor(x, y) {
       this.x = x;
       this.y = y;
     }
 } 
 coinLocations();
//loading character img
var character = new Image();
character.src = "img/character-right.png";
//setting default player
var player = { 
	x:0,
	y:385,
	speed:15,
	img:"img/character-right.png"
};

//coinLocations();
//playgame();


function playgame() {
	renderGame();
	drawImg(sprite_json,"sprite");
	
}
function action(){
	
}
function renderGame(){
	
	//redraw background to clear
	//loadImg("sprite");
	drawImg("","background");
	drawImg(sprite_json,"sprite");
	//score title
	context.font = "12px Verdana";
	context.fillStyle = "black";
	context.fillText("Score: "+score,10,20);
	//sorcerer
	character.src = player.img;
	context.drawImage(character, 0, 0, 140, 140, player.x, player.y, 140, 140);
	//if(!coins_loaded){
	//	coins_loaded=true;
		
		loadCoins();
	//}
	//load title
	//setting game title
	context.font = "19px Impact";
	context.fillStyle = "black";
	context.fillText("Sorcerers Peril",400,20);
	move();

}

function drawImg(json,name){

    var img = new Image();
    img.src = "img/"+name+".png";
    if(json == ""){
    	context.drawImage(img,0,0);//draw static bg
    }else{
        var parsed = JSON.parse(json);
		for(var x = 0; x<parsed.ranges.length;x++){
    	   for(var i = parsed.ranges[0][0];i<parsed.ranges[0][1];i++){
    	   
    	       for(var j = parsed.ranges[0][2];j<parsed.ranges[0][3];j++){
    	       //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    	        //# of tiles * width/height ensures next tile starts at end of last one
    		       
    		       context.drawImage(img,85,0,16,16,(i*16),(16*30),16,16);
    		       context.drawImage(img,85,0,16,16,(i*16),(16*31),16,16);
    		       
    		       //console.log("0,1,"+(i*16)+" ,"+(16*parsed.ranges[0][3]));
    	    	}
    		}
    	}
    }
    
}
function loadCoins(){
	for(var i = 0;i<coin_locations.length;i++){
		context.drawImage(coins,0,0,19,22,coin_locations[i].x,coin_locations[i].y,19,22);
	}
}
function coinLocations(){
	var num_coins = 25;
	///for(var i = 0;i<num_coins;i++){
		//var ran_num_x = getRandomNum("x");
		//var ran_num_y = getRandomNum("y");
		coin_locations[0] = new Coin(250,430);
		coin_locations[1] = new Coin(275,430);
		coin_locations[2] = new Coin(300,430);
		coin_locations[3] = new Coin(325,430);
	//}
}

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

function keyDownHandler(e) {
        if(e.keyCode == 39) {
            right = true;
        }
        else if(e.keyCode == 37) {
            left = true;
        }
        else if(e.keyCode == 32) {
		  if (released) {
			jumping = true;
			released = false;
		  }
            
         }
}

function keyUpHandler(e) {
            if(e.keyCode == 39) {
            right = false;
        }
        else if(e.keyCode == 37) {
            left = false;
        }
        else if(e.keyCode == 32) {
            jumping = false;
            falling = true;
        }
}


// key functions
function move() {
	if (jumping) {
                if (player.y > canvas.height/3) {
                    player.y -= 10;
                }
                 if (player.y <= canvas.height/3) {
                     jumping = false;
                     falling = true;
                 }
                }
            else if (falling) {
					
                if (player.y < 385) {console.log('checking');
                    player.y += 20;
                }
                if (player.y >= 385) {
                    player.y = 385;
                    falling = false;
					released = true;
                }
            }
            if (left) {
            	player.img = "img/character-left.png";
                if (player.x > 0) {
                    player.x -= 15;
                }
            }
            else if (right) {
            	player.img = "img/character-right.png";
                if (player.x < canvas.width-140) {
                    player.x += 15;
                }
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
	
	
}

//random generated coin locations.
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
setInterval(renderGame, 100);