
//CLASSES 
function Leaf (base) {
  this.base = base;
  this.parentid;
  this.child;
  
  this.id = 0;
  
  this.sides = new Array();
  
  base.strokeColor = "black";
  
  this.grow = function (event) {
    if (this.child==null) {
      if (event.count % 10==0) {
      
        //create the new child
        var kidbase = this.base.clone(); 
        kidbase.position -= 10;
        this.child = new Leaf(kidbase);
        
        //give the child an ID and a pointer to its parent
        this.child.id = this.id + 1;
        this.child.parentid = this.id;
      }
    } else {
      this.child.grow(event)
    }
    
  }
}//end of Leaf




//LOOP.
function onFrame(event) {
//  console.log("Time:" + event.time.toFixed());
//  seed.grow()
}//end of onFrame

//spot = new Point(view.size.width/2, view.size.height);
base = new Path(new Point(view.size.width/2 - 20, view.size.height - 20), new Point(view.size.width/2 + 20, view.size.height - 20))
seed = new Leaf(base);

//test loop.
for (i=0;i<50; i++) {
  seed.grow({count: i});
}

console.log(seed);