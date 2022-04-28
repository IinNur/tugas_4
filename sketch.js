let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(220);
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1.5;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(255, 0, 0);
      stroke('white')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('white');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('green');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      fill(255, 0, 0);
      stroke('white')
      ellipse(this.location.x, this.location.y, 60, 60)
      
      line(this.location.x-10, this.location.y-10, projPoint.x-1, projPoint.y-1)
      line(this.location.x+10, this.location.y+10, projPoint.x-1, projPoint.y-1)
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      
     
      circle(wanderPoint.x, wanderPoint.y, 16);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    noStroke();
    translate(this.location.x, this.location.y)
    rotate(theta)
    fill('blue')
  triangle(0, this.l/2+100, 50, -this.l/2, this.l,-10)
  triangle(0, this.l/2-110, 50, -this.l/2, this.l,10)
    square (-100,-4.5,15);
    square (-80,-10,30);
    square (-120,0,10); 
    
  line(200,900,200,10)
    fill(255, 0, 0)
  ellipse(-120,-100,130,80)

  line(185,100,70,100)
  line(55,85,40,70)
  line(40,135,55,115) 
    
  fill(0, 0, 0)
  ellipse(-95,-85,15,15)
  ellipse(-130,-80,25,25)
  ellipse(-155,-120,15,15)
  ellipse(-120,-110,25,25)
  ellipse(-165,-95,20,20)
  ellipse(-90,-120,15,15)
  fill(0,0,0)
  arc(-75,-100,55,55,radians(268), radians(90))
  fill(255,255,255)
  ellipse(-60,-90,10,10)
  ellipse(-60,-110,10,10)
   fill(255, 192, 203);
  rect(140, 200, 25, 100);
  rect(240, 200, 25, 100);
  fill(0);
  rect(140, 280, 25, 25);
  rect(240, 280, 25, 25);
  fill(255, 192, 203);
  ellipse(200, 200, 50, 100);
  ellipse(165, 150, 25, 50);
  ellipse(235, 150, 25, 50);
  circle(200, 200, 125);
  fill(255);
  circle(175, 170, 25);
  fill(0);
  circle(175, 170, 10);
  
  // right eye
  fill(255);
  circle(225, 170, 25);
  fill(0);
  circle(225, 170, 10);
  fill(255, 192, 203);
  ellipse(200, 210, 50, 25);
  fill(0);
  circle(190, 210, 10);
  circle(210, 210, 10);
    
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}