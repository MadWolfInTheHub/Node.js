const express = require('express')

const Joi = require('joi')
const app = express();

app.use(express.json());
app.use(logger);

const courses = [
  {
    id: 1,
    name: 'course1',
  },
  {
    id: 2,
    name: 'course2',
  },
  {
    id: 3,
    name: 'course3',
  },
]

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given ID was not found')
  res.send(course)
});


// POST request
app.post('/api/courses', (req, res) => {

  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);
    

  const course =  {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);

});

// PUT request

app.put('/api/courses/:id', (req, res) => {
  //  Look up the course
  // If not existing,  return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("The course with the given ID was not found")

  // Validate
  // If invalid, return 400 -Bad request
  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Update th=e course
  // Return updated course to client
  course.name = req.body.name ;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1)
  res.send(course);
})

function validateCourse(course) { 
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })

  return schema.validate(course);
}

// PORT 
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`));