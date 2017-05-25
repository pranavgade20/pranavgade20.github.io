var balls = [null];
var n = 50;

function setup(){
   createCanvas(windowWidth, windowHeight);
   background(60, 100, 70);
   colorMode(HSB, 100);
   
   for(var i = 0; i < n; i++){
      balls[i] = new ball();
   }
}

function draw(){
   background(60, 100, 70, 20);
   
   for(var i = 0; i < n; i++){
      balls[i].update();
      balls[i].show();
   }
}

function ball(){
   this.x = random(0, width);
   this.y = random(0, height);
   
   this.xSpeed = random(-3, 3);
   this.ySpeed = random(-3, 3);
   
   this.update = function(){
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      if(this.x >= (width-10) || this.x <= 10){
         this.xSpeed *= -1;
      }
      if(this.y >= (height-10) || this.y <= 10){
         this.ySpeed *= -1;
      }
	  if(this.y > height){
		  this.y = (height-10);
	  }
      
      this.ySpeed+=0.2;
   }
   
   this.col = random(0, 100);
   this.show = function(){
      noStroke();
      fill(this.col, 100, 100);
      ellipse(this.x, this.y, 20, 20);
   }
}

function mousePressed(){
  var b = [];
  for(var i = 0; i < 5; i++){
  b[i] = new ball();
  b[i].x = mouseX;
  b[i].y = mouseY;
  balls.push(b[i]);
  n++;
  }
}
