const Joi = require('joi'); 
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  genre: {
    type: genreSchema,
    req: true,
  },
  numberInStock: { 
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  dailyRetailRate: { 
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
}));

const validateMovies = (movie) => {
  const newMovie = { 
    title: movie.title, 
    numberInStock: movie.numberInStock, 
    genreId: movie.genreId,
    dailyRetailRate: movie.dailyRetailRate
  };
  const schema = Joi.object({ 
    title: Joi.string().min(3).required(),
    numberInStock: Joi.number().required(),
    dailyRetailRate: Joi.number().required(),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(newMovie);
}

exports.Movie = Movie;
exports.validate = validateMovies;