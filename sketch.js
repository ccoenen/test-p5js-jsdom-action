function setup() {
	createCanvas(1920,1080);
	textSize(30);
	textAlign(CENTER);
}

function draw() {
	background(0);
	fill(255);
	push();
	translate(frameCount*5, 50);
	rotate(frameCount/20);
	rect(-25, -25, 50, 50);
	fill(0);
	text(frameCount, 0, 0);
	pop();
}
