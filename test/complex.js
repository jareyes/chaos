"use strict";
const Complex = require("../lib/complex");
const { expect } = require("chai");

describe("Complex", () => {
  it("can add two complex numbers", () => {
    expect((new Complex(-7, 2)).add(new Complex(3, -8))).to.deep.equal(new Complex(-4, -6));
  });

  it("can multiply two complex numbers", () => {
    expect((new Complex(1, 4)).multiply(new Complex(5, 1))).
      to.deep.equal(new Complex(1, 21));
  });

  it("can find the modulus of a complex number", () => {
    expect((new Complex(0, 0)).abs()).to.equal(0);
    expect((new Complex(1, 0)).abs()).to.equal(1);
    expect((new Complex(0, -1)).abs()).to.equal(1);
    expect((new Complex(3, 4)).abs()).to.equal(5);
    expect((new Complex(-3, -4)).abs()).to.equal(5);
  });
});
