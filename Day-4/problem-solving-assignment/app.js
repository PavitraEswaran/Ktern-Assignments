let input = [
  { id: "1", refTaskID: "", title: "First task" },
  { id: "2", refTaskID: "1", title: "Second task" },
  { id: "3", refTaskID: "2", title: "Third task" },
  { id: "4", refTaskID: "1", title: "Fourth task" },
  { id: "5", refTaskID: "1", title: "Fifth task" },
  { id: "6", refTaskID: "3", title: "Sixth task" },
  { id: "7", refTaskID: "4", title: "Seventh task" },
  { id: "8", refTaskID: "4", title: "Eighth task" },
  { id: "9", refTaskID: "8", title: "Ninth task" },
  { id: "10", refTaskID: "9", title: "Random task" },
  { id: "11", refTaskID: "8", title: "Random 2 task" },
  { id: "12", refTaskID: "5", title: "Random 3 task" },
  { id: "13", refTaskID: "1", title: "Random 4 task" },
];

let inputID = 7;
let output = [];
let objDict = {};
let count = 0;

input.forEach((obj) => {
  objDict[obj.id] = { id: obj.id, refTaskID: obj.refTaskID, title: obj.title };
});

if (objDict.hasOwnProperty(inputID)) {
  let obj = objDict[inputID];
  output.push({ id: obj.id, refTaskID: obj.refTaskID, title: obj.title });
  while (obj.refTaskID !== "") {
    obj = objDict[obj.refTaskID];
    output.push({ id: obj.id, refTaskID: obj.refTaskID, title: obj.title });
    count += 1;
    if (count > input.length) {
      console.log("Infinite loop");
      process.exit(1);
    }
  }
  output.reverse();
  console.log(output);
} else {
  console.log("Invalid Id");
}
