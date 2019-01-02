class Ball
{
	constructor(x,y,r,d,vx,vy)
	{
		if(vx === undefined)
			vx=0;
		if(vy === undefined)
			vy=0;
		this.radius = r;
		this.density = d; // g/m3
		this.mass = this.density*(4/3*PI*this.radius*this.radius*this.radius);
		this.position = createVector(x,y);
		this.velocity = createVector(vx,vy);
		this.acceleration = createVector(0,0.01*this.mass/1000);
		this.friction = createVector(-sign(vx)*0.01,0);
		this.c = color(random(255),random(255),random(255));
		this.angle = 0; //degrees
	}

	draw()
	{
		push();
		translate(this.position.x,this.position.y);
		rotate(radians(this.angle));
		fill(this.c);
		stroke(0);
		ellipse(0,0,this.radius*2,this.radius*2);
		line(-this.radius,0,this.radius,0);
		line(0,-this.radius,0,this.radius);
		pop();
	}

	update()
	{
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		if(this.velocity.y==0)
			this.velocity.add(this.friction);

		if(sign(this.velocity.x)==sign(this.friction.x))
			this.friction.mult(0);


		if(this.velocity.y>0 & dist(this.position.x,this.position.y,this.position.x,height)<= this.radius)
		{
			this.position.y = height - this.radius;
			this.bounceGravity();
		}

		if(this.velocity.x>0 & dist(this.position.x,this.position.y,width,this.position.y)<= this.radius)
		{
			this.position.x = width - this.radius;
			this.bounceEdgeRight();
		}

		if(this.velocity.x<0 & dist(this.position.x,this.position.y,0,this.position.y)<= this.radius)
		{
			this.position.x = this.radius;
			this.bounceEdgeLeft();
		}

		var t = this.position.x/this.velocity.x;
		var T = 1000*(1/this.velocity.x/360);
		this.angle = 2*PI*t/T;

	}

	bounceGravity()
	{
		this.velocity.y*=(-0.9);

		if(this.velocity.y>-1)
		{
			this.acceleration.y=0;
			this.velocity.y = 0;
		}
	}

	bounceEdgeRight()
	{
		this.velocity.x*=(-0.2);
		this.friction.mult(-1);


		if(this.velocity.x>-0.06)
		{
			this.acceleration.x=0;
			this.velocity.x = 0;
		}
	}

	bounceEdgeLeft()
	{
		this.velocity.x*=(-0.2);
		this.friction.mult(-1);


		if(this.velocity.x<0.06)
		{
			this.acceleration.x=0;
			this.velocity.x = 0;
		}
	}
}

function sign(x)
{
	if(x>=0)
		return 1;
	else
		return -1;
}