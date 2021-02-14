var slider;
var a;
var cb;

var c = 5;
var n = 0;

function setup() {
  var canvas = createCanvas(windowWidth, 500);
  canvas.parent('sketch-holder');
  background(217, 242, 242);

  angleMode(DEGREES);
  
  slider = createSlider(0, 180, 88.5, 0.5);
  slider.parent('slider-holder');
  slider.style('width', '500px');

  cb = createCheckbox('Lines mode', true);
  cb.parent('slider-holder');
  
  x1 = 0;
  x2 = 0;
}
var temp;

var x1;
var y1;

var x2;
var y2;

function draw() {
   translate(width/2, height/2);
  
  a = slider.value();
  
  if(temp != slider.value()){
    background(217, 242, 242);
    
    n = 0;
    x1 = 0;
    y1 = 0;
  }
  temp = slider.value();
  
  var t = n * a;
  var r = c * sqrt(n);
  
  x2 = r * cos(t);
  y2 = r * sin(t);
  
  if((n%2) == 0){
    stroke(255, 0, 0);
  }else{
    stroke(0, 0, 255);
  }
  if(cb.checked()){
    strokeWeight(0.5);
    line(x1, y1, x2, y2);
  }else{
    strokeWeight(5);
    point(x1, y1);
  }
  
  x1 = x2;
  y1 = y2;
  
  n++;
}
