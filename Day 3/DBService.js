const { ObjectId } = require("mongodb");
const database = require("./database");

// service for inserting student
module.exports.insertStudent = async (record) => {
  const db = await database.getDB();
  const student = await db.collection("details").insertOne(record);
  return student;
};

// service for retrieving all students
module.exports.getAllStudents = async () => {
  const db = await database.getDB();
  const students = await db.collection("details").find({}).toArray();
  return students;
};

// service for getting student by id
module.exports.getStudentById = async (studentId) => {
  const db = await database.getDB();
  const student = await db
    .collection("details")
    .findOne(new ObjectId(studentId));
  return student;
};

// service for updating student record
module.exports.updateStudent = async (studentId, studentData) => {
  const db = await database.getDB();
  const student = await db
    .collection("details")
    .updateOne({ _id: new ObjectId(studentId) }, { $set: studentData });
  return student;
};

// service for deleting record
module.exports.deleteStudent = async (studentId) => {
  const db = await database.getDB();
  const student = await db
    .collection("details")
    .deleteOne({ _id: new ObjectId(studentId) });
  return student;
};

// service for retriving students record whose percentage is greater than given percentage
module.exports.percentageGreater = async (percentValue) => {
  const db = await database.getDB();
  const student = await db
    .collection("details")
    .aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          english: 1,
          maths: 1,
          science: 1,
          computer: 1,
          percentage: {
            $avg: ["$english", "$maths", "$science", "$computer"],
          },
        },
      },
      {
        $match: {
          percentage: { $gt: parseInt(percentValue) },
        },
      },
    ])
    .toArray();
  return student;
};

// service for retrieving a student percentage
module.exports.getStudentPercentage = async (studentId) => {
  const db = await database.getDB();
  const student = await db
    .collection("details")
    .aggregate([
      {
        $match: {
          _id: new ObjectId(studentId),
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          percentage: {
            $avg: ["$english", "$maths", "$science", "$computer"],
          },
        },
      },
    ])
    .toArray();
  console.log(student);
  return student;
};
