// Libraries
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:/vidly')
  .then(() => console.log('Connected to Mongodb...'))
  .catch(err => console.error('Could not connect to Mongodb...'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


/* // Listening on port 3000

app.listen(3000, () => console.log('Listening on port 3000...')) */

// PORT using Nodemon to watch for changes
const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port ${port}...`)});

// install nodemon and run the app using "npx nodemon" command