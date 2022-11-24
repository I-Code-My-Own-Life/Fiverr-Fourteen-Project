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
    }
    draw(){
        c.strokeStyle = "green";
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
        c.stroke();
        this.x += this.dx;
        this.y += this.dy;
    }
}
stars.push(new Star(randomIntFromInterval(50, canvas.width - 50),0,0,randomIntFromInterval(1,3),100,0.5,6));
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