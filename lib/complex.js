"use strict";

class Complex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(z) {
    return new Complex(this.x + z.x, this.y + z.y);
  }

  multiply(z) {
    return new Complex(
      this.x * z.x - this.y * z.y,
      this.x * z.y + this.y * z.x
    );
  }

  abs() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

module.exports = Complex;
