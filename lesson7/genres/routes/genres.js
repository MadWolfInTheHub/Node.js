const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
}));

const validateGenre = (genre) => {
  const name = {name: genre};
  const schema = Joi.object({name: Joi.string().min(3).required()});
  return schema.validate(name);
}

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) res.status(404).send('Genre with given ID was not found.');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if(error) res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if(error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if(!genre) res.status(404).send('Genre with given ID was not found.');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if(!genre) res.status(400).send('Genre with given ID was not found.');

  res.send(genre);
});

module.exports = router;