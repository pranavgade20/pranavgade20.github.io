var sa;
var sb;

var A;
var B;
var a = 3;
var b = 5;
  
var r = 0;
var g = 0;

var d = 0;
function setup(){
  var canvas = createCanvas(windowWidth*0.9, 500);
  canvas.parent('sketch-holder');
  background(217, 242, 242);

  sa = createSlider(0, 30, 10, 1);
  sa.parent('slider-holder');
  sa.style('width', '500px');
  sb = createSlider(0, 30, 15, 1);
  sb.parent('slider-holder');
  sb.style('width', '500px');

  A = width*0.5;//Scaling factor
  B = height*0.5;//Scaling factor
}

var t;
var r = 0;
var g = 0;

function draw(){
   translate(width/2, height/2);
  background(217, 242, 242);

  a = sa.value();
  b = sb.value();
  
  var x;
  var y;
  
  beginShape();
  for(t = 0; t < 30; t+=0.1)
  {
  x = A*sin(a*t + d);
  y = B*sin(b*t);
  stroke(r++, g+=random(1), 0, 100);
  strokeWeight(2);
  vertex(x, y);
  }
  //uncomment n comment next line if u want to change d color of d figure.
  //stroke(r++, g+=random(1), 0, 100);
  stroke(0);
  noFill();
  endShape();
  
  if(r>360){
    r -= random(360);
  }
  if(g>360){
    g -= random(360);
  }

  if(d>=180){
    d = 0;
  }

  if(!mouseIsPressed){
  d+=0.01;
  }
}
