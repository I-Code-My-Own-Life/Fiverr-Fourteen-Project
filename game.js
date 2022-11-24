// Selecting the canvas element :
let canvas = document.getElementById("canvas");
// Our Context : 
let c = canvas.getContext("2d");
// Setting the canvas width and height : 
canvas.width = innerWidth;
canvas.height = innerHeight;

// Allows random intervals that do not start with 1. So you can get a random number from 10 to 15 for example.

function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

let stars = [];
class Star{
    constructor(x,y,dx,dy,radius,inset,n){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.inset = inset;
        this.radius = radius;
        this.n = n;
        this.alpha = Math.random() + 0.2;
    }
    draw(){
        c.fillStyle = `rgba(0,255,0,${this.alpha})`;
        c.beginPath();
        c.save();
        c.translate(this.x,this.y);
        c.moveTo(0 ,0 - this.radius);

        for(let i = 0; i < this.n; i++){
            c.rotate(Math.PI / this.n);
            c.lineTo(0,0 - (this.radius * this.inset));
            c.rotate(Math.PI / this.n);
            c.lineTo(0,0 - this.radius);
        }

        c.restore();
        c.closePath();
        c.fill();
        this.x += this.dx;
        this.y += this.dy;
    }
}
// Pushing stars in the stars array : 
for(let i = 0; i < 20; i++){
    let x = randomIntFromInterval(50, canvas.width - 50);
    let y = 0;
    let dx = 0;
    let dy = randomIntFromInterval(2,5);
    let radius = randomIntFromInterval(50, 100);
    let inset = Math.random();
    // The number of legs : 
    let n = randomIntFromInterval(3, 10);
    stars.push(new Star(x,y,dx,dy,radius,inset,n));
}
// Making our animation loop : 
function animate(){
    // Drawing the black background : 
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    // Drawing stars on the screen :
    stars.forEach((star)=>{
        star.draw();
    }) 
    // Calling animate over and over again : 
    requestAnimationFrame(animate);
}

animate();

// Resizing the canvas whenever the screen is resized : 
addEventListener("resize",()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})