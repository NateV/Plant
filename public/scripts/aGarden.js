var myPath = new Path();
myPath.strokeColor = 'black';
myPath.add(new Point(0,0), new Point(0,50), new Point(25, 25));
myPath.closed = true;
myPath.fullySelected = true;

triangle = myPath.clone();
triangle.position.x += 100;
triangle.smooth();

alsoTriangle = new Path.RegularPolygon(new Point(50, 100), 3, 35);
alsoTriangle.fillColor = 'black';