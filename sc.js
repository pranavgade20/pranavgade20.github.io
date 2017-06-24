var p;
var scl = 2;
function setup(){
   createCanvas(500*scl, 500*scl);
   pixelDensity(1);

   p = createP('Move to start.')
}

var r = 174*scl;
var la = 0;

function draw(){
   background(255);
   noStroke();
   fill(255, 0, 0, 255);
   ellipse(250*scl, 350*scl, 300*scl, 300*scl);
   fill(0, 0, 255, 50);
   ellipse(250*scl, 200*scl, r*scl, r*scl);

   var ar = 0;

   loadPixels();
   for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
         var i = (x + (y * width))*4;
         if(pixels[i+2] == 50){
            ar++;
         }
      }  
   }
   // var i = (mouseX + (mouseY * width))*4;
   // p.html(pixels[i+0] +" "+ pixels[i+1] +" "+ pixels[i+2] +" "+ pixels[i+3]);
   console.log(r + " " + ar);

   updatePixels();
   var abc;//var to store half area of smaller circle
   abc = 0.5 * PI * 150*scl * 150*scl;
   if(Math.abs(abc-ar) < Math.abs(abc-la)){
      la = ar;//last best area = current area.
      p.html("Radius = " + r + "     Ratio r2:r1 = " + r/(150*scl)); // add la for best area
   }

   r+=0.001;
}

function mousePressed() {
   noLoop();
}