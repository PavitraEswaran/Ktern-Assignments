const { MongoClient, ObjectId } = require("mongodb");

const dbUrl = "mongodb://127.0.0.1:27017/";
const dbName = "StudentData";
const client = new MongoClient(dbUrl);

module.exports.getDB = async () => {
  const conn = await client.connect();
  return conn.db(dbName);
};
