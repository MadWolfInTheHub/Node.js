const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentals: {
        type: Number,
        // required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
}));

const validationRental = (rental) => {
  const newRental = {
    customerId: rental.customerId,
    movieId: rental.movieId,
  };

  const schema = Joi.object({
    customerId : Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(newRental);
};

exports.validate = validationRental;
exports.Rental = Rental;