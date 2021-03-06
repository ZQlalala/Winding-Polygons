var x = new Array();
var y = new Array();
var ax;
var ay;
var n = 0;
var flag = 0;
var pick_point = 0 ;
var Wn;

function setup() {
  // put setup code here
  var canvas = createCanvas(900, 900);
  canvas.parent('sketch-holder');
  //button = createButton('reset');
  //button.position(400, 300);
  //resetSketch();
  //

}
function resetSketch(){
  x = [];
  y= [];
  flag = 0;
  n = 0;
  pick_point = 0 ;

 }

function resetWatcher(){
    flag = 1;
  }
 function keyTyped() {
   if (key == 'a') {
     resetSketch();
   }
   if (key == 'b') {
     resetWatcher();
   }
   // uncomment to prevent any default behavior
   // return false;
 }


function draw() {
  // put drawing code here
  background(220);
  line(0,100,width,100)
  text("1.draw", 10,height/10)
  text("Restart : a ", 10,height/10-20)
  text("winding number: ", 7*(width/8)-200, height/10);
 
  fill(0);
  if(pick_point == 1)
    {
    	text("-> 2. pick any point ", 50, height/10);
    }
  //keyIsDown(e);
    //button.mouseClicked(changeBG);
  if (n != 0){
	  ellipse(x[0], y[0], 10, 10)
	  for (var i = 1; i < n; i++){
		ellipse(x[i], y[i], 10, 10);
		line(x[i-1], y[i-1], x[i], y[i]);
	   }
	}
  if (flag>1){
	  ellipse(ax, ay, 10, 10);
	  //textAlign(CENTER);
      	  if (Wn == 0.5){
		text("Don't put the point on a line! Please choose a new point.", width/2, height/2);
		flag = 3;
	  }
	  else
	      text( Wn, 7*(width/8)-100, height/10);
  }


}

function mouseClicked(){
	if (mouseX > 0 && mouseX < 900 && mouseY > 0 && mouseY < 900){
		if (flag == 0){
			if ( abs(mouseX-x[0])<=5&&abs(mouseY-y[0])<=5){
				flag = 1;
				x[n] = x[0];
				y[n] = y[0];
				n++
				pick_point++;
			}
			else{
				x[n] = mouseX;
				y[n] = mouseY;
				n++;
			}
		}
		else if (flag == 1 || flag == 3){
			flag = 2;
			ax = mouseX;
			ay = mouseY;
/* 			ax = 100;
			ay = 100;
			x[0]=150;
			y[0]=50;
			x[1]=50;
			y[1]=100;
			x[2]=150;
			y[2]=100;
			x[3]=150;
			y[3]=50;
			n=4 */
			Wn = WindingNumber(ax, ay, x, y, n)
		}
		else{
			flag = 0;
			n = 0;
		
		}
	}
}

function ccw(x0, y0, x1, y1, x2, y2){
	return ( (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0) );
}
function WindingNumber(ax, ay, x, y, n){
	var wn = 0;
	for (var j = 0; j < n-1; j++){
		if (ccw(x[j], y[j], x[j+1], y[j+1], ax, ay) == 0 && ((x[j] >= ax && x[j+1] < ax) || (x[j] < ax && x[j+1] >= ax))){
			wn = 0.5;
			break;
		}
		if (y[j] < ay) {
			if(y[j+1]>=ay){
				if (ccw(x[j], y[j], x[j+1], y[j+1], ax, ay) > 0)
					wn++;
			}
			
		}
		else{
			if (y[j+1] < ay){
				if (ccw(x[j], y[j], x[j+1], y[j+1], ax, ay) < 0)
					wn--;
			}
		}
	}
	return abs(wn);
}
