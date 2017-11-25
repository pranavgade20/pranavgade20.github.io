function setup(){
   createCanvas(windowWidth, windowHeight);
   background(200);
}

var a = 15, b = 15;
var c = 1;
var x1 = -250, y1 = 0;
var x2 = x1, y2 = y1;
function draw(){
   translate(width/2, height/2);
   y1 = (b/a)*Math.sqrt((a*a)-(x1*x1));
   line(x1, y1, x2, y2);
   line(x1, -y1, x2, -y2);
   x2 = x1;
   y2 = y1;
   x1+=1;
}

function mouseReleased(){
   a = mouseX/2;
   b = mouseY/2;

   background(200);
   x1 = -a;
   y1 = 0;
   x2 = x1;
   y2 = y1;
}