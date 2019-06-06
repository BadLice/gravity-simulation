var balls = [];
var dim = 100;
function setup()
{
	createCanvas(600,600);
	ball = new Ball(width/2,0,0.92,0.1,1);
	for(var i=0;i<dim;i++)
	{
		balls.push(new Ball(width*random(0.9),height*random(0.9),random(10,25),0.092,random(-10,10)))
	}
}

function draw()
{
	background(51);

	for(var i=0;i<dim;i++)
	{
		balls[i].update();
		balls[i].draw();
	}
}