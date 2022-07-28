const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled');
};

// // Db work
// dbDebugger('Connected to database...')

const port = process.env.port || 3000;
app.listen(port, () => `Listening on ${port}`);