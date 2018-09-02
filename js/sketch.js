var canvas, context;
var width, height;
var timeStart = new Date().getTime();
var time = 0;
//shimmy
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
//setup globals
noise.seed(Math.random());
var noiseScale = 1000, particleSpeed = 0.3;
var particles = [];
var numParticles = 200;
var colors = ['rgba(255,0,93, 1)', 'rgba(125,0,255, 1)', 'rgba(2, 27, 137,1)'];
function init() {
    canvas = document.createElement('canvas');
    width = document.getElementById("sketch-holder").offsetWidth;
    height = document.getElementById("sketch-holder").scrollHeight;
    //width = 400;
    //height = 400;
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0,0,0,0)';
    document.getElementById("sketch-holder").appendChild(canvas);
    for (var i = 0; i < numParticles; i++) {
        particles.push(new particle);
    }
}

function animate() {
    requestAnimFrame(animate);
    draw();
}

function particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.r = Math.random() * 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.ttl = Math.random()*2000 ;
    this.display = function () {
        angle = noise.perlin2(this.x / noiseScale, this.y / noiseScale) * noiseScale * Math.PI * 2;
        this.x += Math.cos(angle) * particleSpeed;
        this.y += Math.sin(angle) * particleSpeed;
        this.ttl-- ;
        if (this.x > width || this.x < 0 || this.y > height || this.y < 0 || this.ttl<=0) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.r = Math.random() * 1.5;
            this.ttl = Math.random()*2000 ;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}

function draw() {
    context.fillStyle = "#020826";
    context.fillRect(0, 0, width, height);
    for (var i = 0; i < numParticles; i++) {
        particles[i].display();
    }
}
init();
animate();