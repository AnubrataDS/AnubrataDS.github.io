

var sketch = function(p) {
var particles_a = [];
var particles_b = [];
var particles_c = [];
var scale;
var rows ;
var cols ;
var nums ;
var noiseScale;
var speed = 0.2;


p.setup = function(){
    console.log('HELLO');
	p.createCanvas(p.windowWidth, p.windowHeight);
	scale = 70 ;
	rows = (p.windowHeight/scale);
	cols = (p.windowWidth/scale) ;
	noiseScale = 900;
	nums = rows*cols;
	console.log(rows);
	
	p.noStroke();
	p.smooth();
	
	p.background(2, 8, 38);
	for(var i = 0; i < nums; i++){
		particles_a[i] = new Particle(p.random(0, p.width),p.random(0,p.height));
		particles_b[i] = new Particle(p.random(0, p.width),p.random(0,p.height));
		particles_c[i] = new Particle(p.random(0, p.width),p.random(0,p.height));
    }
}

p.draw = function(){
	p.fill(2,8,38);
    p.rect(0,0,p.width,p.height);
		for(var i = 0; i < nums; i++){
		var radius = p.map(i,0,nums,1,3);
		var alpha = p.map(i,0,nums,100,255);

		p.fill(255, 0, 93,particles_a[i].alpha);
		particles_a[i].move();
		particles_a[i].display(radius);

		p.fill(125, 0, 255 ,particles_b[i].alpha);
		particles_b[i].move();
		particles_b[i].display(radius);

		p.fill(2, 27, 137,particles_c[i].alpha);
		particles_c[i].move();
		particles_c[i].display(radius);
		}
}
function Particle(x, y){
	this.dir = p.createVector(0, 0);
	this.vel = p.createVector(0, 0);
	this.pos = p.createVector(x, y);
	this.alpha = 255;

	this.move = function(){
		var angle = p.noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*p.TWO_PI*noiseScale;
		this.dir.x = p.cos(angle);
		this.dir.y = p.sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(speed);
		this.pos.add(this.vel);
		this.alpha = p.map(this.vel.mag(),0,speed,100,255);
		this.checkEdge();
	}

	this.checkEdge = function(){
		if((this.pos.x > p.width)||(this.pos.x < 0)||(this.pos.y > p.height)||(this.pos.y < 0)||(this.vel.mag() <0.1)){
			this.pos.x = p.random(0, p.width);
			this.pos.y = p.random(0, p.height)
			this.dir = p.createVector(0, 0);
			this.vel = p.createVector(0, 0);
			this.pos = p.createVector(this.pos.x, this.pos.y);
		}
	}

	this.display = function(r){
		p.ellipse(this.pos.x, this.pos.y, r,r);
	}
}
}
new p5(sketch, 'sketch-holder');