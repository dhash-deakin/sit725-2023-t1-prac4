const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://dhash:DILU1234hashi@cluster0.c5mwu4v.mongodb.net"; // defining MongoDB connection URI
const dbName = "test"; // defining database name
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function insertData(data) {
  const db = client.db(dbName);
  const collection = db.collection("test"); // defining collection name

  try {
    const result = await collection.insertOne(data);
    console.log("Inserted data:", result.insertedId);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

module.exports = {
  client, // Export the client variable
  connectToDatabase,
  insertData
};
