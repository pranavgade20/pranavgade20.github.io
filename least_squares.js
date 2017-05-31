var xVals = [];
var yVals = [];
var xSum = 0;
var ySum = 0;

function setup(){
   createCanvas(windowWidth, windowHeight);
   background(95, 154, 76);
   noLoop();
}

function draw(){
   background(95, 154, 76);

   //A grid to make it fancier
   stroke(89, 179, 0);
   for (var i = 0; i < width; i+=20) {
      line(i, 0, i, height);
   }
   for (var i = 0; i < height; i+=20) {
      line(0, i, width, i);
   }

   var xMean = xSum/xVals.length;
   var yMean = ySum/yVals.length;
   var numer = 0;
   var denom = 0;

   for (var i = 0; i < xVals.length; i++) {
      stroke(170, 255, 0);
      strokeWeight(3);
      point(xVals[i], yVals[i]);//show the points
      strokeWeight(1);
      noFill();
      ellipse(xVals[i], yVals[i], 10, 10);//make it fancier

      //the ordinary least squares method to find the line
      numer += (xVals[i]-xMean)*(yVals[i]-yMean);
      denom += (xVals[i]-xMean)*(xVals[i]-xMean);
   }

   var m = numer/denom;
   var b = yMean - (m*xMean);

   var y1 = b;
   var y2 = (m*width) + b;

   stroke(0, 0, 225);
   strokeWeight(3);
   line(0, y1, width, y2);

   //display the error rate
   var errSum = 0;
   for (var i = 0; i < xVals.length; i++) {
      errSum += (yVals[i] -(m*xVals[i] + b)) * (yVals[i] -(m*xVals[i] + b));
   }
   errSum /= xVals.length;
   stroke(255, 117, 26);
   strokeWeight(1);
   textSize(15);
   text('Error Rate:'+round(errSum/1000)+'%', 35, 35);
}

function mousePressed(){
   xVals.push(round(mouseX));
   yVals.push(round(mouseY));

   xSum+=xVals[xVals.length-1];
   ySum+=yVals[yVals.length-1];

   redraw();
}