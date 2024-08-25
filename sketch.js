let circleSize, halfSize;
let circles = [];
let repelDist;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');

  colorMode(HSB);
  noStroke();

  circleSize = height * 0.1;
  halfSize = circleSize / 2;
  repelDist = circleSize * 2;

  initializeCircles();

  mouseX = -width / 2;
  mouseY = -height / 2;
}

function draw() {
  background(255, 0.08);

  for (let circle of circles) {
    circle.displayCircle();
    circle.changeColor();
    circle.repelCircle();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  initializeCircles();
  mouseX = -width / 2;
  mouseY = -height / 2;
}

function initializeCircles() {
  circles = [];
  for (let x = halfSize; x <= width; x += circleSize) {
    for (let y = halfSize; y <= height; y += circleSize) {
      circles.push(new Circle(x, y));
    }
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.fillROn = false;
  }

  changeColor() {
    let c = color(200, 10, 100);
    let r = color(0, 10, 100);
    let fillR = lerpColor(c, r, 0.1);

    if (this.fillROn) {
      fill(fillR);
    } else {
      fill(c);
    }
  }

  displayCircle() {
    circle(this.x, this.y, circleSize);
  }

  repelCircle() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < repelDist) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      this.x += cos(angle) * (repelDist - d) * 0.05;
      this.y += sin(angle) * (repelDist - d) * 0.05;
      this.fillROn = true;
    } else {
      this.x = lerp(this.x, this.originalX, 0.05);
      this.y = lerp(this.y, this.originalY, 0.05);
      this.fillROn = false;
    }
  }
}