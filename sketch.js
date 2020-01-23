/**
 * Random strokes with user-controlled parameters
 *
 * MOUSE
 * position x          : stroke weight
 * position y          : stroke speed
 *
 * KEYS
 * s                   : stop
 */
'use strict';

let FPS = 1;
let stopToggle = false;

function setup() {
  createCanvas(720, 720);
  frameRate(FPS);
  noFill();
}

function draw() {
  if (stopToggle == true) return;

  const x1 = round(random(0, 720));
  const y1 = round(random(0, 720));
  const x2 = round(random(0, 720));
  const y2 = round(random(0, 720));

  const r = round(random(0, 255));
  const g = round(random(0, 255));
  const b = round(random(0, 255));

  const weight = map(mouseX, 0, 720, 1, 20);
  stroke(r, g, b);
  strokeWeight(weight);
  paint(x1, y1, x2, y2);

  const speed = map(mouseY, 0, 720, 1, 10);
  frameRate(speed);
}

function paint(x1, y1, x2, y2) {
  const controlPoints = [1, 1, 1, 1]
    .map(_ => round(random(0, 720)));
  bezier(x1, y1, ...controlPoints, x2, y2);
}

function keyReleased() {
  if (key == 's' || key == 'S') stopToggle = !stopToggle;
}
