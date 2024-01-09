// Importing the Express library
const express = require("express");

// Creating an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Array to store student records
let studentsRecord = [];

// counter variable to track id
let idCounter = 1;

// Expected structure for a student object
const expected_object = {
  name: "string",
  english: "number",
  maths: "number",
  science: "number",
  computer: "number",
};

// Extracting the required fields from the expected object
const requiredFields = Object.keys(expected_object);

const checkForIdIndex = (studentId) => {
  return studentsRecord.findIndex((student) => student.id === studentId);
};

const isDataValid = (data) => {
  return Object.keys(data).every(
    (key) => typeof data[key] === expected_object[key]
  );
};

// Route to get all students' records

app.get("/getAllStudents", (req, res) => {
  res.send(studentsRecord);
});

// Route to get a specific student by ID

app.get("/getStudentByID/:id", (req, res) => {
  let studentId = parseInt(req.params.id);
  let idIndex = checkForIdIndex(studentId);

  // If id is present, then student record is sent as a response
  if (idIndex !== -1) {
    res.status(200).send(studentsRecord[idIndex]);
  } else {
    res.status(404).send({ error: "Student id is not valid" });
  }
});

// Route to add a new student

app.post("/addNewStudent", (req, res) => {
  let newStudent = req.body;
  /**
   * Checking whether all fields in request body is present in expected object
   */
  let checkfields = requiredFields.every((i) => newStudent.hasOwnProperty(i));
  /**
   * Finding difference between keys in passed value and expected object to
   * find out keys that shouldn't be present in the value
   */
  let unknown_keys = Object.keys(newStudent).filter(
    (key) => !requiredFields.includes(key)
  );
  if (!checkfields || unknown_keys.length > 0) {
    res.status(400).send({ error: "Invalid input structure" });
  } else {
    /**
     * Checking whether the given request body contains correct datatype value
     */
    if (isDataValid(newStudent)) {
      newStudent["id"] = idCounter;
      // counter value is added after each insertion
      idCounter++;
      studentsRecord.push(newStudent);
      res.status(201).send({
        message: "Student data added successfully",
        record: newStudent,
      });
    } else {
      res.status(400).send({ error: "Invalid input data" });
    }
  }
});

// Route to update a student's data by ID

app.post("/updateStudentByID/:id", (req, res) => {
  let studentId = parseInt(req.params.id);
  let requestPayload = req.body;
  /**
   * Checking whether all fields in request body is present in expected object
   */
  let checkfields = Object.keys(requestPayload).every((i) =>
    requiredFields.includes(i)
  );
  let idIndex = checkForIdIndex(studentId);
  if (!checkfields) {
    res.status(400).send({ error: "Invalid input structure" });
  } else {
    // If id is present, data validation takes place
    if (idIndex !== -1) {
      /**
       * Checking whether the given request body contains correct datatype value
       */
      if (isDataValid(requestPayload)) {
        for (let key in requestPayload) {
          studentsRecord[idIndex][key] = requestPayload[key];
        }
        res.status(200).send({
          message: "Student updated successfully",
          record: studentsRecord[idIndex],
        });
      } else {
        res.status(400).send({ error: "Invalid input data" });
      }
    } else {
      res.status(404).send({ error: "Student id is not valid" });
    }
  }
});

// Route to delete a student by ID

app.get("/deleteStudentByID/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const idIndex = checkForIdIndex(studentId);

  // If id is present, we remove that particular object from the array.
  if (idIndex !== -1) {
    studentsRecord.splice(idIndex, 1);
    res.status(200).send({ message: "Student data deleted successfully" });
  } else {
    res.status(404).json({ error: "Student id is not valid" });
  }
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log("App running in port 3000");
});
