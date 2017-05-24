var next;
var skip;

var dialog;
var r, g, b;
var flag = 0;
function setup(){
  createCanvas(500, 500);
  background(200);
  pixelDensity(1);
  
  dialog = createP('Are the colours different?');

  next = createButton('No');
  next.position(10, 575);
  next.mousePressed(changeCol);

  skip = createButton('Yes');
  skip.position(300, 575);
  skip.mousePressed(nextCol);


  r = 0;
  g = random(255);
  b = random(255);
}

var rVal, bVal, gVal;

function draw(){
   loadPixels();

   for (var y = 0; y < height/2; y++) {
   	for (var x = 0; x < width; x++) {
   		var index = (x + y*width)*4;
         if(flag == 0){
            pixels[index] = 0;
         }else{
            pixels[index] = r;
         }

         if(flag == 1){
            pixels[index+1] = 0;
         }else{
            pixels[index+1] = g;
         }
   		
         if(flag == 2){
            pixels[index+2] = 0;
         }else{
            pixels[index+2] = b;
         }
   		pixels[index+3] = 100;
   	}
   }

   for (var y = height/2; y < height; y++) {
   	for (var x = 0; x < width; x++) {
   		var index = (x + y*width)*4;
 
   		pixels[index] = r;
   		pixels[index+1] = g;
   	 	pixels[index+2] = b;
   	 	pixels[index+3] = 100;
   	}
   }

   updatePixels();
   //line(0, 250, 500, 250);

}

function changeCol(){
   dialog.html("Are the colours different?");
   if(flag == 0){
      r+=0.5;
   }else if(flag ==1){
      g+=0.5;
   }else{
      b+=0.5;
   }
}

function nextCol(){
   if(flag == 0){
      rVal = r;
      r = random(255);
      g = 0;
      b = random(255);
   }else if(flag ==1){
      gVal = g;
      r = random(255);
      g = random(255);
      b = 0;
   }else{
      bVal = b;
      testDone();
      noLoop();
   }
   flag++;
}

function testDone(){
   console.log(rVal, bVal, gVal);
   next.hide();
   skip.hide();

   dialog.html("Test for colour preception compelete.You can see " + round(255/rVal) + " shades of red, "  + round(255/gVal) + " shades of green, and " + round(255/bVal) + " shades of blue(" + floor((255*255*255)/(rVal*gVal*bVal)) + " colours in all.)");
}
