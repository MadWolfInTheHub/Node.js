const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses')
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error on connecting to MongoDB', err));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/genres', genres);

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...')
}

app.use(logger);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));