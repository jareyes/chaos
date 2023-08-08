"use strict";

class Scale {
  constructor(src_min, src_max, dst_min, dst_max) {
    this.src_min = src_min;
    this.dst_min = dst_min;
    this.dst_max = dst_max;
    this.range = src_max - src_min;
    this.width = dst_max - dst_min;
  }

  lerp(val) {
    if(val < this.src_min) {
      return this.dst_min;
    }

    if(val > this.src_max) {
      return this.dst_max;
    }

    return this.width * (val - this.src_min) / this.range + this.dst_min;
  }
}

module.exports = Scale;
