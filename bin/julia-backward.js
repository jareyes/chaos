"use strict";
const fs = require("node:fs");
const { Color } = require("../lib/color");
const Complex = require("../lib/complex");
const Image = require("../lib/image");
const ORBIT_LENGTH = 90000;
const COLOR = new Color(255, 0, 255);

function backward(z, c) {
  // z = Q(w) = w^2 + c. So to go backwards, we solve for w:
  // w = +/- sqrt(z - c).
  return z.subtract(c).sqrt();
};

function choose(els) {
  const r = Math.trunc(Math.random() * els.length);
  return els[r];
}

async function main(x0, y0, cx, cy) {
  const image = new Image(800, 800);
  image.setXScale(-2, 2);
  image.setYScale(-2, 2);

  const c = new Complex(cx, cy);
  let z = new Complex(x0, y0);
  for(let i = 0; i < ORBIT_LENGTH; i++) {
    const preimage = backward(z, c);
    z = choose(preimage);

    // Burn through the first fifty iterates to get
    // closer to the Julia set
    if(i < 50) {
      continue;
    }

    // Plot points further in the history
    image.setColor(z.x, z.y, COLOR);
  }

  const buf = image.to_ppm();
  await fs.promises.writeFile("julia.ppm", buf);
}

const [, , x0, y0, cx, cy] = process.argv;
main(+x0, +y0, +cx, +cy);
