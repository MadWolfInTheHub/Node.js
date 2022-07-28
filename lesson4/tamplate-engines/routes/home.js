const express = require('express');
const router = express.Router();

// GET request + html render

router.get('/', (req, res) => {
  res.render('index', {tittle: 'My Express app', message: 'Hello'});
})

module.exports = router;