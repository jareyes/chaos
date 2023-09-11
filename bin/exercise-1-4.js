function iterate(f) {
  let x = 0;
  for(let i = 0; i < 15; i++) {
    console.log(`x_${i}`, x);
    x = f(x);
  }
}

console.log("f(x) = x + 1");
iterate((x) => x + 1);

console.log("f(x) = 2 * (x + 1)");
iterate((x) => 2 * (x + 1));

console.log("f(x) = 1/2 * (x + 1)");
iterate((x) => 1/2 * (x + 1));

console.log("f(x) = x**2 - 1");
iterate((x) => x**2 - 1);

console.log("f(x) = x**2 - 2");
iterate((x) => x**2 - 2);
