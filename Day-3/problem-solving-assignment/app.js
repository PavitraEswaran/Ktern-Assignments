array = [3, 25, 6, 7, 8, 3, 45, 2, 44, 4445, 432];
let maxlength = 1;
let length = 1;
if (array.length == 0) console.log(0);
else {
  for (i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      length++;
    } else {
      length = 1;
    }
    maxlength = Math.max(maxlength, length);
  }
  console.log(maxlength);
}
