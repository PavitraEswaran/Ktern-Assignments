// Importing the Express library
const express = require("express");

const dbService = require("./DBService");

// Creating an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

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

const isDataValid = (data) => {
  return Object.keys(data).every(
    (key) => typeof data[key] === expected_object[key]
  );
};

// Route to get all students' records

app.get("/getAllStudents", async (req, res) => {
  try {
    let studentsRecord = await dbService.getAllStudents();
    res.status(200).send(studentsRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to fetch students whose percentage is greater than given percentage
app.get("/getAllStudentsPercentage/:percentage", async (req, res) => {
  const reqPercentage = req.params.percentage;
  try {
    const studentsRecord = await dbService.percentageGreater(reqPercentage);
    if (studentsRecord.length > 0) {
      res.status(200).send(studentsRecord);
    } else {
      res.status(404).send({ error: "No student found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get a specific student by ID

app.get("/getStudentByID/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await dbService.getStudentById(studentId);
    // If student is present, then student record is sent as a response
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send({ error: "Student id is not valid" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: String(err) });
  }
});

// Route to fetch percentage of given student id
app.get("/getPercentageByID/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await dbService.getStudentPercentage(studentId);
    if (student.length > 0) {
      res.status(200).send(student);
    } else {
      res.status(404).send({ error: "Student id is not valid" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: String(err) });
  }
});

// Route to add a new student

app.post("/addNewStudent", async (req, res) => {
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
      try {
        let createRecord = await dbService.insertStudent(newStudent);
        res.status(201).send({
          message: "Student data added successfully",
          record: newStudent,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
      }
    } else {
      res.status(400).send({ error: "Invalid input data" });
    }
  }
});

// Route to update a student's data by ID

// Route to update a student's data by ID

app.post("/updateStudentByID/:id", async (req, res) => {
  let studentId = parseInt(req.params.id);
  let requestPayload = req.body;
  /**
   * Checking whether all fields in request body is present in expected object
   */
  let checkfields = Object.keys(requestPayload).every((i) =>
    requiredFields.includes(i)
  );

  try {
    const student = await dbService.getStudentById(studentId);
    if (!checkfields) {
      res.status(400).send({ error: "Invalid input structure" });
    } else {
      // If student is present, data validation takes place
      if (student) {
        /**
         * Checking whether the given request body contains correct datatype value
         */
        if (isDataValid(requestPayload)) {
          await dbService.updateStudent(studentId, requestPayload);
          const studentUpdate = await dbService.getStudentById(studentId);
          res.status(200).send({
            message: "Student updated successfully",
            record: studentUpdate,
          });
        } else {
          res.status(400).send({ error: "Invalid input data" });
        }
      } else {
        res.status(404).send({ error: "Student id is not valid" });
      }
    }
  } catch (err) {
    res.status(500).send({ err: String(err) });
  }
});

// Route to delete a student by ID

app.get("/deleteStudentByID/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await dbService.getStudentById(studentId);
    // If student is present, we remove that particular object from the array.
    if (student) {
      const result = await dbService.deleteStudent(studentId);
      if (result.deletedCount == 1)
        res.status(200).send({ message: "Student data deleted successfully" });
    } else {
      res.status(404).json({ error: "Student id is not valid" });
    }
  } catch (err) {
    res.status(500).send({ error: String(err) });
  }
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log("App running in port 3000");
});
