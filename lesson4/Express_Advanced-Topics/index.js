const debug = require('debug')('app:startup');
const config = require('config');
// const dbDebugger = require('debug')('app:db');

const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...')
}

app.use(logger);
// console.log(`Node_ENV: ${process.env.NODE_ENV}`) // undefined
// console.log(`app: ${app.get('env')}`);

const validation = (course) => {
  const name = {name: course};
  const schema = Joi.object({ name: Joi.string().min(3).required()});
  return schema.validate(name);
}


const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
];

// GET request

app.get('/api/courses', (req, res) => {
  res.send(courses)
});

app.get('/api/courses/:id', (req,res) => {
  const course = courses.find( el => el.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  res.send(course);
});

// Post request

app.post('/api/courses', (req, res) => {
  const { error } = validation(req.body.name)
  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }

  courses.push(course);
  res.send(course);
});

// PUT request
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  const { error } = validateCourse(req.body.name); //result.error
  if(error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  res.send(course);
});

// DELETE request

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  // Delete
  const index = courses. indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
})


const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));