const Joi = require ('joi');

const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Serhii',
  },
  {
    id: 3,
    name: 'Asya',
  },
];


app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); //result.error
  
  // 400 Bad request
  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  // Validate
  // If invalid, return 400

  const { error } = validateCourse(req.body); //result.error

  // 400 Bad request
  if(error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);

});


function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req, res) => {
  // Look uo the course
  // Not existing, return 404
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  // Delete
  const index = courses. indexOf(course);
  courses.splice(index, 1);

  //  Return the same course
  res.send(courses);
})



// /api/courses/1

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');
  res.send(course)
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
  res.send(req.params);
});

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port ${port}...`)});