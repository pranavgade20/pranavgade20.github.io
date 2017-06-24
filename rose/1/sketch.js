var k;
var slider;

function setup() {
   createCanvas(500, 500);
   background(200);
   angleMode(DEGREES);
   slider = createSlider(0, 50, 7, 0.1);
   slider.position(0, 510);
   k = slider.value();

   x1 = 200*cos(k*a)*cos(a);
   y1 = 200*cos(k*a)*sin(a);
}

a = 0;
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

function draw(){
   translate(250, 250);
   
   if(k != slider.value()){
      background(200);
      a = 0;
      x1 = 200*cos(k*a)*cos(a);
      y1 = 200*cos(k*a)*sin(a);
   }
   k = slider.value();
   

   x2 = 200*cos(k*a)*cos(a);
   y2 = 200*cos(k*a)*sin(a);

   stroke(255, 0, 0);
   strokeWeight(1);
   line(x1, y1, x2, y2);

   x1 = x2;
   y1 = y2;
   a++;
}
