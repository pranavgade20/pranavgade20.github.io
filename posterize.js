var capture;
var b;
//var vScale = 16;
function setup(){
   createCanvas(500, 500);
   pixelDensity(1);
    
   capture = createCapture(VIDEO);
   capture.size(500, 500);
   capture.hide();
   
   //capture.size(width/vScale, height/vScale); 
    
   //b = createButton('Capture');
   //b.position(10, 510);
   //b.mousePressed(cap);
    
   //s = createSilder(1, 10, 3, 1);
   //s.position(50, 510);
}

function draw(){
   filter(POSTERIZE, 3);
   image(capture, 0, 0, capture.width, capture.height);
}
/**
function draw(){
  capture.loadPixels();
  loadPixels();
  for(var y = 0; y<height/vScale; y++){
    for(var x = 0; x<width/vScale; x++){
      var r = x + y*width/vScale;
      var g = x + y*width/vScale + 1;
      var b = x + y*width/vScale + 2;
      var a = 255;
      
      fill((r+g+b)/3, a);
      
      rect(x*vScale, y*vScale, vScale, vScale);
    }
  }
  
}

function cap(){
   saveCanvas('myPoster', 'jpg');
}
**/
