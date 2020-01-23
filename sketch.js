/**
 * Random strokes with user-controlled parameters
 *
 * MOUSE
 * position y          : stroke speed
 *
 * KEYS
 * s                   : stop
 */
'use strict';

let FPS = 1;
let stopToggle = false;
const palette = [];

function setup() {
  createCanvas(720, 720);
  frameRate(FPS);
  noFill();
  colorMode(HSB, 360, 100, 100, 1);

  for (let i = 0; i < 5; i++) {
    const H = random(360);
    const S = random(100);
    const B = random(100);
    palette.push([H, S, B]);
  }
}

function draw() {
  if (stopToggle == true) return;

  const x1 = round(random(0, 720));
  const y1 = round(random(0, 720));
  const x2 = round(random(0, 720));
  const y2 = round(random(0, 720));

  const color = random(palette);
  const weight = round(random(5, 20));

  stroke(...color);
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
