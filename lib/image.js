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
    console.log("length", length);
    this.buffer = Buffer.alloc(length, 0);
    this.x_scale = new Scale(0, 1, 0, width);
    this.y_scale = new Scale(0, 1, 0, height);
  }

  setXScale(min, max) {
    this.x_scale = new Scale(min, max, 0, this.width - 1);
  }

  setYScale(min, max) {
    this.y_scale = new Scale(min, max, 0, this.height - 1);
  }

  setColor(x, y, color) {
    const px = Math.trunc(this.x_scale.lerp(x));
    const py = Math.trunc(this.y_scale.lerp(y));
    const offset = py * this.width * CHANNELS + px * CHANNELS;

    //console.log("offset", offset, "py", py, "y", y.toFixed(2), "px", px, "x", x.toFixed(2), "red", color.red, "green", color.green, "blue", color.blue);
    this.buffer.writeUIntLE(color.red, offset + OFFSET_RED, DEPTH);
    this.buffer.writeUIntLE(color.green, offset + OFFSET_GREEN, DEPTH);
    this.buffer.writeUIntLE(color.blue, offset + OFFSET_BLUE, DEPTH);
  }

  to_ppm() {
    const header = Buffer.from(`P6\n${this.width} ${this.height}\n255\n`);
    return Buffer.concat([header, this.buffer]);
  }
}

module.exports = Image;
