var slider;
var a;
var cb;

var c = 5;
var n = 0;

function setup() {
  createCanvas(500, 500);
  background(255);
  angleMode(DEGREES);
  
  slider = createSlider(0, 180, 88.5, 0.5);
  slider.position(0, 530);
  slider.style('width', '180px');

  cb = createCheckbox('Lines mode', true)
  
  x1 = 0;
  x2 = 0;
}
var temp;

var x1;
var y1;

var x2;
var y2;

function draw() {
  translate(250, 250);
  
  a = slider.value();
  
  if(temp != slider.value()){
    background(255);
    
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
