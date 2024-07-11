function setup() {
  // Add your setup code here
  createCanvas(window.innerWidth, 400); // Example: create a canvas with width and height of 400 pixels
  background(220); 
}

function draw() {
  // Add your drawing code here
  noStroke();
  fill(255, 80);
  circle(mouseX, mouseY, width*0.05);
}
