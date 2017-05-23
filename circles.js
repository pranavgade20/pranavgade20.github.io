function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
   colorMode(HSB, 100);
}
var x = 0;
var y = 0;
var ctr = 0;

function draw() {
  x = random(0, width);
  y = random(0, height);
  fill(ctr/10, 100, 100);
  ellipse(x, y, 50, 50);

  ctr++;
  if(ctr > 1000){
    noLoop();
  }
}
