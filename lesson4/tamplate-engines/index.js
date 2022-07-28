const debug = require('debug');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

// process.env.NODE_ENV // undefined
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);
// app.get('env')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/home', home);

// Configuration 
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail server name: ${config.get('mail.host')}`);
// console.log(`Mail password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled')
}

app.use(logger);

// const validation = (course) => {
//   const name = {name: genre};
//   const schema = Joi.object({ name: Joi.string().min(3).required()});
//   return schema.validate(name);
// }

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));