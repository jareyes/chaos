const process = require("node:process");

const x0 = +process.argv[2];
const orbit_length = +process.argv[3];

console.log("initial x", x0);
console.log("orbit length", orbit_length);

let x_old = x0;
for(let i = 0; i < orbit_length; i++) {
  console.log(`x_${i}`, x_old);
  const x_new = Math.sin(x_old);
  x_old = x_new;
}
