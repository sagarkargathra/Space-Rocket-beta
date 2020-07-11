var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// creating a spaceship.
var spaceship = {

	color: "white",
	width: 8,
	height: 22,
	position: {
		x: 20,
		y: 20
	},
	velocity:{
	
		x: 0,
		y: 0
	},
	angle: 0, 
	engineOn: false,
	rotatingLeft: false,
	rotatingRight: false,
	crashed: false
}

// drawing the spaceship.

function drawSpaceShip (){

	context.save();
	context.beginPath();
	context.translate(spaceship.position.x,spaceship.position.y);
	context.rotate(spaceship.angle);
	context.rect(spaceship.width* -0.5,spaceship.height* -0.5,spaceship.width,spaceship.height);
	context.fillStyle = spaceship.color;
	context.fill();
	context.closePath();
	
	// draw the flame if the engine is on.
	if(spaceship.engineOn){
		context.beginPath();
		context.moveTo(spaceship.width* 0.5,spaceship.height* 0.5);
		context.lineTo(spaceship.width* 0.5,spaceship.height* 0.5);
		context.lineTo(0,spaceship.height* 0.5 + Math.random() * 10);
		context.lineTo(spaceship.width* -0.5,spaceship.height* 0.5);
		context.closePath();
		context.fillStyle = "orange";
		context.fill();
	}
	context.restore();
}

var gravity = 0.1;

function updateSpaceship(){

	if(spaceship.rotatingRight){
		spaceship.angle += Math.PI/180;
	}
	else if(spaceship.rotatingLeft)
	{
		spaceship.angle -= Math.PI/180;
	}
	
	if(spaceship.engineOn){
		spaceship.position.x += Math.sin(spaceship.angle);
		spaceship.position.y -= Math.cos(spaceship.angle);
	}	
	spaceship.velocity.y -= gravity;
}

function draw (){

	// clear entire screen.
	context.clearRect(0,0,canvas.width,canvas.height);

	updateSpaceship();
	
	drawStars();
	
	// begin drawing.
	drawSpaceShip();
	
		

	
	requestAnimationFrame(draw);
}

function keyLetGo(event) {
	switch(event.keyCode){
		case 37:
		// left arrow key
		spaceship.rotatingLeft = false;
		break;
		
		case 39:
		// right arrow key
		spaceship.rotatingRight = false;
		break;
		
		case 38:
		// up arrow key
		spaceship.engineOn = false;
		break;
	}
}
document.addEventListener('keyup',keyLetGo);

function keyPressed (event){
	switch(event.keyCode){
		case 37:
		// left arrow key
		spaceship.rotatingLeft = true;
		break;
		
		case 39:
		// right arrow key
		spaceship.rotatingRight = true;
		break;
		
		case 38:
		// up arrow key
		spaceship.engineOn = true;
		break;
	}
}

document.addEventListener('keydown', keyPressed);
var stars = [];



function drawStars() 
{
  context.save();
  context.fillStyle = "#111"
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < 100; i++) {
  stars[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.sqrt(Math.random() * 2),
    alpha: 1.0,
    decreasing: true,
    dRatio: Math.random()*0.05
  }
}
  
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    if (star.decreasing == true)
    {
      star.alpha -= stars.dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += stars.dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }
    context.fill();
  }
  context.restore();
}
drawStars();
draw();

