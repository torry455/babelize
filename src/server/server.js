const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'test';

// Підключення до MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Ручка для додавання користувача
    app.post('/users', async (req, res) => {
      const usersCollection = db.collection('users');
      const user = { name: 'John', age: 30 };
      const result = await usersCollection.insertOne(user);
      res.send(`User added: ${result.insertedId}`);
    });

    // Ручка для отримання всіх користувачів
    app.get('/users', async (req, res) => {
      const usersCollection = db.collection('users');
      const users = await usersCollection.find({}).toArray();
      res.json(users);
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });