var capture;
var b;
//var vScale = 16;
function setup(){
   createCanvas(500, 500);
   pixelDensity(1);
    
   capture = createCapture(VIDEO);
   capture.size(500, 500);
   capture.hide();
}

function draw(){
   capture.filter(POSTERIZE, 3);
   image(capture, 0, 0, capture.width, capture.height);
}
