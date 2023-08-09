"use strict";
const Complex = require("../lib/complex");
const { Color, ColorScale, ColorGradient } = require("../lib/color");
const fs = require("node:fs");
const Image = require("../lib/image");
const process = require("node:process");

const MAX_ITERATE = 50;

function flight(z, c) {
  for(let i = 0; i < MAX_ITERATE; i++) {
    if(z.abs() > 2) {
      return i;
    }
    // Qc(z) = z^2 + c
    z = z.multiply(z).add(c);
  }
  return MAX_ITERATE;
}

async function main(x0, y0) {
  const image = new Image(1000, 1000);
  image.setXScale(-2, 2);
  image.setYScale(-2, 2);

  const color_scale = new ColorGradient(
    0,
    MAX_ITERATE,
    [
      new Color(255, 128, 255),
      new Color(255, 255, 0),
      new Color(0, 0, 0),
      new Color(255, 255, 255),
    ]
  );

  const c = new Complex(x0, y0);
  const x_step = 4 / image.width;
  const y_step = 4 / image.height;
  let px = 0;
  for(let y = -2; y <= 2; y += y_step) {
    for(let x = -2; x <= 2; x += x_step) {
      const z0 = new Complex(x, y);
      const i = flight(z0, c);
      const color = color_scale.lerp(i);
      image.setColor(x, y, color);
      px++;
    }
  }
  const buf = image.to_ppm();
  await fs.promises.writeFile("julia.ppm", buf);
}

const [, , x0, y0] = process.argv;
main(+x0, +y0);
