const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
}));

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.number().min(5).max(50).required(),
    isGold: Joi.boolean()
  };
  
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;