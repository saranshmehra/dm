const express = require('express');
const mongoose = require('mongoose');
const controller = require('./controllers');

const app = express();

mongoose.connect('mongodb://localhost:27017/DM',
  { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connection established');
});

app.use('/', controller);

app.listen('3604', () => {
  console.log('App is running on port 3604');
});
