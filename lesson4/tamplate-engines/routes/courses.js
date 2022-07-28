const express = require('express');
const router = express.Router();

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
];

// GET request + html render

router.get('/', (req, res) => {
  res.send(courses)
});

router.get('/:id', (req,res) => {
  const course = courses.find( el => el.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  res.send(course);
});

// Post request

router.post('/', (req, res) => {
  const { error } = validation(req.body.name)
  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }

  courses.push(course);
  request.send(courses);
});

// PUT request
router.put('/:id', (req, res) => {
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  const { error } = validateCourse(req.body.name); //result.error
  if(error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  res.send(course);
});

// DELETE request

router.delete('/:id', (req, res) => {
  const course = courses.find(user => user.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given id was not found!');

  // Delete
  const index = courses. indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

module.exports = router;