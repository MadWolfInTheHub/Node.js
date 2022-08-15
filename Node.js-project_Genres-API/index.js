// Libraries
const express = require('express');
const app = express();
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
require('./startup/prod')(app);
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');  

// process.on('uncaughtException', (ex) => {
//   console.log('Uncaught exception');
//   winston.error(ex.message, ex)
// })


// winston.add(winston.transports.File, { filename: 'logfile.log' });
// winston.add(winston.transports.MongoDB, { 
//   db: "mongodb://localhost/vidly",
//     // collection: "log",
//     level: "error",
//     storeHost: true,
//     capped: true,
//     // metaKey: 'meta'
  
// });

// const p = Promise.reject(new Error('Smt failed miserably'));

// process.then(() => console.log('Done')) 

if(!config.get('jwtPrivateKey')) {
  // % export vidly_jwtPrivateKey=mySecureKey     Use it in terminal
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

/* // Listening on port 3000

app.listen(3000, () => console.log('Listening on port 3000...')) */

// PORT using Nodemon to watch for changes
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// "mongodb+srv://admin:admin@cluster0.5qbm9ur.mongodb.net/?retryWrites=true&w=majority"

// install nodemon and run the app using "npx nodemon" command