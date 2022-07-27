// Libraries

const Joi = require('joi'); // Joi package is used to perform input validation.

const express = require('express');
const app = express();

app.use(express.json());

// Api array

const genres = [
  {
    id: 1,
    name: 'cartoons',
  },
  {
    id: 2,
    name: 'horrors',
  },
  {
    id: 3,
    name: 'drama',
  },
];

// Validation

const validation = (genre) => {
  const name = { name: genre };
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(name);
}

// GET request (all genres)

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// Get request (specific genre by id)

app.get('/api/genres/:id', (req, res) => {
  const genre = genres[req.params.id]
  if(!genre) return res.status(404).send('Genre not found!!!')
  res.send(genre);
});


// Post request

app.post('/api/genres', (req, res) => {
  const { error } = validation(req.body.name);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length +1,
    name: req.body.name,
  }
  genres.push(genre)
  res.send(genres);
});

// PUT request

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre is not found...');

  const { error } = validation(req.body.name);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name
  res.send(genres);
});

// DELETE request

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre not found!!!');

  const { error } = validation(req.body.name);
  if(error) return res.status(404).send(error.details[0].message)

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genres);
});

/* // Listening on port 3000

app.listen(3000, () => console.log('Listening on port 3000...')) */

// PORT using Nodemon to watch for changes
const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port ${port}...`)});

// install nodemon and run the app using "npx nodemon index.js" command