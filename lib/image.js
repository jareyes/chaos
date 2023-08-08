"use strict";
const {Buffer} = require("node:buffer");
const Scale = require("./scale");

const DEPTH = 1;
const CHANNELS = 3;
const OFFSET_RED = 0;
const OFFSET_GREEN = 1;
const OFFSET_BLUE = 2;

class Image {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    const length = width * height * DEPTH * CHANNELS;
    this.buffer = Buffer.alloc(length, 0);
    this.x_scale = new Scale(0, 1, 0, width);
    this.y_scale = new Scale(0, 1, 0, height);
  }

  setXScale(min, max) {
    this.x_scale = new Scale(min, max, 0, this.width);
  }

  setYScale(min, max) {
    this.y_scale = new Scale(min, max, 0, this.height);
  }

  setColor(x, y, color) {
    const px = this.x_scale.lerp(x);
    const py = this.y_scale.lerp(y);
    const offset = Math.trunc(this.width * py + px);

    this.buffer.write(color.red, offset + OFFSET_RED, DEPTH);
    this.buffer.write(color.green, offset + OFFSET_GREEN, DEPTH);
    this.buffer.write(color.blue, offset + OFFSET_BLUE, DEPTH);
  }

  to_ppm() {
    const header = Buffer.from(`P6\n${this.width} ${this.height}\n${2**DEPTH}\n`);

    return Buffer.concat([header, this.buffer]);
  }
}

module.exports = Image;
