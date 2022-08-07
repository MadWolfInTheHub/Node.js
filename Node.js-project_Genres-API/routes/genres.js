const express = require('express');
const router = express.Router();

// Api array

const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Horror',
  },
  {
    id: 3,
    name: 'Romance',
  },
];

// Validation

const validation = (genre) => {
  const name = { name: genre };
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(name);
}

// GET request (all genres)
 
router.get('/', (req, res) => {
  res.send(genres);
});

// Get request (specific genre by id)

router.get('/:id', (req, res) => {
  const genre = genres[req.params.id]
  if(!genre) return res.status(404).send('Genre not found!!!')
  res.send(genre);
});


// Post request

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre is not found...');

  const { error } = validation(req.body.name);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name
  res.send(genres);
});

// DELETE request

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre not found!!!');

  const { error } = validation(req.body.name);
  if(error) return res.status(404).send(error.details[0].message)

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genres);
});

module.exports = router;
