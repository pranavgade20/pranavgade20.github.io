function setup(){
  createCanvas(windowWidth, windowHeight);
  background(200);
  colorMode(HSB, 100);
}

var s = 10;
var posy = -s;
var posx = 0;
var flag = true;

var ctr = 0;

function draw(){
  drw();
  
  if(ctr>(width/s)){
    posy += s + s * sin(radians(30));
    if(flag){
      posx = s * cos(radians(30));
      flag = false;
    }else{
      posx = 0;
      flag = true;
    }
    ctr = 0;
  }
ctr++;
}

function drw(){
  
  var dx = s * cos(radians(30));
  var dy = s * sin(radians(30));
  
  fill(posy/(height/100), 50, 100);
  beginShape();
  strokeWeight(0);
  stroke(255);
  //fill(start.y/5, 50, 100);
  vertex(posx, posy);
  vertex(posx - dx, posy + dy);
  vertex(posx - dx, posy + s + dy);
  vertex(posx, posy + s + dy + dy);
  vertex(posx + dx, posy + s + dy);
  vertex(posx + dx, posy + dy);
  endShape(CLOSE);
  
  posx += (2*dx);
  
}