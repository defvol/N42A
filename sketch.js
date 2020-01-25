/**
 * Random strokes with user-controlled parameters
 *
 * MOUSE
 * position y          : stroke speed
 *
 * KEYS
 * p                   : pause
 * s                   : save
 */
'use strict';

let FPS = 1;
let stopToggle = false;
const palette = [];

function setup() {
  createCanvas(960, 540);
  frameRate(FPS);
  noFill();
  colorMode(HSB, 360, 100, 100, 1);

  for (let i = 0; i < 5; i++) {
    const H = random(360);
    const S = i % 2 === 0 ? random(100) : 100;
    const B = i % 2 === 0 ? 100 : random(100);
    palette.push([H, S, B]);
  }
}

function draw() {
  if (stopToggle == true) return;

  const x1 = round(random(0, width));
  const y1 = round(random(0, height));
  const x2 = round(random(0, width));
  const y2 = round(random(0, height));

  const color = random(palette);
  const weight = round(random(5, 20));

  strokeWeight(weight);
  splash(x1, y1, x2, y2, color);

  const speed = map(mouseY, 0, height, 1, 30);
  frameRate(speed);
}

function splash(x1, y1, x2, y2, color) {
  stroke(...color);

  const controlPoints = [1, 1, 1, 1]
    .map((_, i) => round(random(0, i % 2 ? height : width)));
  const bezierPoints = [x1, y1, ...controlPoints, x2, y2];
  bezier(...bezierPoints);

  noStroke();
  fill(...color);

  const dropCount = round(random(1, 10));
  randomDrops(dropCount, bezierPoints, color);

  noFill();
}

function randomDrops(n, bezierPoints, color) {
  const [x1, y1, cx1, cy1, cx2, cy2, x2, y2] = [...bezierPoints];
  const size = random(2, 20);
  for (let i = 0; i < n; i++) {
    const xoffset = random(-40, +40);
    const yoffset = random(-40, +40);
    const x = bezierPoint(x1, cx1, cx2, x2, i / n) + xoffset;
    const y = bezierPoint(y1, cy1, cy2, y2, i / n) + yoffset;
    ellipse(x, y, size, size);
  }
}

function keyReleased() {
  switch (key) {
    case 'p':
      stopToggle = !stopToggle;
      break;
    case 's':
      saveCanvas('canvas', 'jpg');
      break;
  }
}
