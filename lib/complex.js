"use strict";

class Complex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(z) {
    return new Complex(this.x + z.x, this.y + z.y);
  }

  subtract(z) {
    return new Complex(this.x - z.x, this.y - z.y);
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

  // NOTE: Returns both square roots in an array
  sqrt() {
    const t0 = Math.atan2(this.y, this.x);
    const r0 = this.abs();
    // The radius of the square root is the square root of the original radius
    // The angle of the square root is half the angle of the original angle
    const r = Math.sqrt(r0);
    const t = t0 / 2;
    return [
      new Complex(r * Math.cos(t), r * Math.sin(t)),
      new Complex(r * Math.cos(t + Math.PI), r * Math.sin(t + Math.PI)),
    ];
  }
}

module.exports = Complex;
