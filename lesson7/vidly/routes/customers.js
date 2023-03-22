const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer')

router.get('/', async function(req, res) {
  const customers = await Customer.find().sort('name')
  res.send(customers);
});

router.get('/:id', async function(req, res) {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('Customer with given ID was not found.');

  res.send(customer);
});

router.post('/', async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  })

  customer = await customer.save();
  res.send(customer)

});

router.put('/:id', async function(req, res) {
  const { error } =  validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);


  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  },
   { new: true })
  if(!customer) return res.status(404).send('Customer with given Id was not found.')

  res.send(customer)
  
});

router.delete('/:id', async function(req, res) {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if(!customer) return res.status(404).send('Customer with given Id was not found.');

  res.send(customer);
});

module.exports = router