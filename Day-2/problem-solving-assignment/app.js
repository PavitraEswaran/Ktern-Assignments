input = [1, 2, 3, 4, 5];
product = 1;
zeroIndex = [];
output = [];
for (let i in input) {
  if (input[i] == 0) {
    zeroIndex.push(i);
    if (zeroIndex.length > 1) {
      output = new Array(input.length).fill(0);
      console.log(output);
      process.exit(1);
    }
  } else product *= input[i];
}
output = input.map((i) =>
  i == 0 ? product : zeroIndex.length > 0 ? 0 : product / i
);

console.log(output);
