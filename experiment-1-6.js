const process = require("process");

let x = +process.argv[2];
const orbit_length = +process.argv[3];

for(let i = 0; i < orbit_length; i++) {
  console.log(`x_${i}`, x);
  x = Math.cos(x);
}
