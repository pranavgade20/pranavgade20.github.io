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
var x;
var y;

function draw(){
   translate(250, 250);
   
   if(k != slider.value()){
      background(200);
      a = 0;
      x1 = 200*cos(k*a)*cos(a);
      y1 = 200*cos(k*a)*sin(a);
   }
   k = slider.value();
   

   x = 200*cos(k*a)*cos(a);
   y = 200*cos(k*a)*sin(a);

   stroke(255, 0, 0);
   strokeWeight(1);
   line(0, 0, x, y);

   a++;
}
