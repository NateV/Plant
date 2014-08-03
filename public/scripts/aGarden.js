function Leaf(basePoints, age) {
  this.adulthood = 10;
  
  this.basePoints = basePoints;
  this.age = age;
  
  this.children = new Array();

  //initialize the path
  this.path = new Path();
  this.path.closed = true;
  this.path.strokeColor = "black";
  this.path.fillColor = "green";
  
  this.base = new Path(this.basePoints.A, this.basePoints.B);
  this.base.strokeColor = "red";
   
  this.grow = function() {
    this.age+=1/60 //age is in seconds. There are 60 frames a second 
//    console.log("I am " + this.age);
    this.path.segments = [this.basePoints.A, this.basePoints.B, this.findTheTip()];
    
    //reproduction
    if (this.age > this.adulthood) {
      this.reproduce();
      console.log("Is reproduce() the problem?");
      for (i = 0; i < this.children.length; i++) {
        this.children[i].grow();
      }
    }//end of reproduction    
  }//end of this.grow
   
   
  this.reproduce = function() {
    if (this.children.length == 0) {
        //3% chance of having one kid
        if (Math.random() < 0.003) {
          if (Math.random() < 0.5) {
            childBase = {A: this.basePoints.A, B: this.findTheTip()};
            this.children[0] = new Leaf(childBase, 0);
          } else {
            childBase = {A: this.findTheTip(), B: this.basePoints.B};
            this.children[0] = new Leaf(childBase, 0);
          }
        }
      } else {
        //1% chance of having a second kid:
        if ((this.children.length == 1) && (Math.random() < 0.001)) {
          if (this.children[0].basePoints.A == this.basePoints.A) {
            childBase = {A: this.findTheTip(), B: this.basePoints.B};
            this.children[1] = new Leaf(childBase, 0);
          } else {
            childBase = {A: this.basePoints.A, B: this.findTheTip()};
            this.children[1] = new Leaf(childBase, 0);
          }
        }
      }
  }//end of this.reproduce() 
  
  this.findTheTip = function () {

     baseVector = this.basePoints.B - this.basePoints.A;
     baseMidpoint = this.basePoints.A + baseVector/2;
     
     altitudeLength = Math.sqrt(3)/2 * baseVector.length;
     altitudeAngle = baseVector.angle + 90;
     altitudeVector = new Point(0,0);
     altitudeVector.angle = altitudeAngle;
     
     if (this.age > this.adulthood) {
       altitudeVector.length = altitudeLength;
     } else {
       altitudeVector.length = (((2*altitudeLength)/this.adulthood) * this.age)  - altitudeLength
     }
     tip = baseMidpoint + altitudeVector;
     return tip;
  }// end of findTheTip
   
}// end of Leaf class



base0 = {A: new Point (400,100), B: new Point (400, 150)}
seed = new Leaf(base0, 5);


function onFrame (event) {
//  console.log("Frame: " + event.count/60);
  seed.grow();
}



  function initializeTip (base, age) {

     baseVector = base.B - base.A;
     baseMidpoint = base.A + baseVector/2;
     
     altitudeLength = Math.sqrt(3)/2 * baseVector.length;
     altitudeAngle = baseVector.angle + 90;
     altitudeVector = new Point(0,0);
     altitudeVector.angle = altitudeAngle;
     
     adulthood = 10
     if (age > adulthood) {
       altitudeVector.length = altitudeLength;
     } else {
       altitudeVector.length = (((2*altitudeLength)/adulthood) * age)  - altitudeLength
     }
     tip = baseMidpoint + altitudeVector;
     return tip;
  }// end of findTheTip