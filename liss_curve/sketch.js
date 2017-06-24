var sa;
var sb;

function setup(){
  createCanvas(500, 500);
  background(200);

  sa = createSlider(0, 30, 5, 1);
  sa.position(0, 510);
  sb = createSlider(0, 30, 3, 1);
  sb.position(0, 530);
}

var t;

var A = 150;//Scaling factor
var B = 150;//Scaling factor
var a = 3;
var b = 5;
  
var r = 0;
var g = 0;

var d = 0;
function draw(){
  translate(250, 250);
  background(200);

  a = sa.value();
  b = sb.value();
  
  var x;
  var y;
  
  beginShape();
  for(t = 0; t < 30; t+=0.1)
  {
  x = A*sin(a*t + d);
  y = B*sin(b*t);
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
