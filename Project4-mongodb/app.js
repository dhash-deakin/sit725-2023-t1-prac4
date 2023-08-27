const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON data in the request body

const uri = 'mongodb+srv://dhash:DILU1234hashi@cluster0.c5mwu4v.mongodb.net'; // MongoDB connection URI
const dbName = 'sit725db'; // Database name
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

async function insertData(data) {
  const db = client.db(dbName);
  const collection = db.collection('formdata');//collection name

  try {
    const result = await collection.insertOne(data);
    console.log('Inserted data:', result.insertedId);
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  insertData(formData)
    .then(() => {
      res.json({ message: 'Data inserted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error inserting data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Connect to the database when the server starts
  connectToDatabase();
});
