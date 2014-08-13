function Leaf(basePoints, age) {
  this.adulthood = 10;
  this.id;
  this.basePoints = basePoints;
  this.age = age;
  
  this.children = new Array();

  //initialize the path
  this.path = new Path();
  this.path.closed = true;
  this.path.strokeColor = "black";
  this.path.fillColor = "green";
  
  this.base = new Path(this.basePoints.A, this.basePoints.B);
  this.base.strokeColor = "#fff";
   
  this.grow = function() {
    this.age+=1/40 //age is in seconds. There are 60 frames a second 
    console.log(this.id + "is growing.");
    this.path.segments = [this.basePoints.A, this.basePoints.B, this.findTheTip()];
    
    //reproduction
    if (this.age > this.adulthood) {
      this.reproduce();
    }//end of reproduction  
    
    //recursion
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
          console.log(this.id + " is telling the " + i + "th child, " + this.children[i].id + " to grow. (age " + this.children[i].age + ")");
          console.log("i: " + i + "; this.children.length: " + this.children.length +";");
          this.children[i].grow();
          console.log("Just finished grow(). Back in " + this.id + " + where i is " + i);
          console.log(this.id + "'s child, " + this.children[i].id + ", has finished growing.");
      }
      console.log("Finished for loop. i here is " + i);
      return;
    } else { 
      console.log(this.id + " has no children. Heading back up.");
      return;
    }  
    console.log("Finished will all of " + this.id + " for this frame.");
  }//end of this.grow
   
   
  this.reproduce = function() {
    if (this.children.length == 0) {
        //3% chance of having one kid
        if (Math.random() < 0.003) {
          //even odds of growing on either side
          if (Math.random() < 0.5) {
            childBase = {A: this.basePoints.A, B: this.findTheTip()};
            this.children[0] = new Leaf(childBase, 0);
            leafCount ++
            this.children[0].id = leafCount;
          } else {
            childBase = {A: this.findTheTip(), B: this.basePoints.B};
            this.children[0] = new Leaf(childBase, 0);
            leafCount ++
            this.children[0].id = leafCount;
          }
        }
      } else {
        //3% chance of having a second kid:
        if ((this.children.length == 1) && (Math.random() < 0.0001)) {
          if (this.children[0].basePoints.A == this.basePoints.A) {
            childBase = {A: this.findTheTip(), B: this.basePoints.B};
            this.children[1] = new Leaf(childBase, 0);
            leafCount ++;
            this.children[1].id = leafCount;
          } else {
            childBase = {A: this.basePoints.A, B: this.findTheTip()};
            this.children[1] = new Leaf(childBase, 0);
            leafCount ++;
            this.children[1].id = leafCount;
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
leafCount = 1;
seed.id = 1;



function onFrame (event) {
  console.log("Frame: " + event.count/60 + ". Leaves: " + leafCount);
  seed.grow();
}

