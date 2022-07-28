// Libraries

const Joi = require('joi'); // Joi package is used to perform input validation.

const express = require('express');
const app = express();
const genres = require('./routes/genres');
;
app.use(express.json());
app.use('/api/courses', genres);


/* // Listening on port 3000

app.listen(3000, () => console.log('Listening on port 3000...')) */

// PORT using Nodemon to watch for changes
const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port ${port}...`)});

// install nodemon and run the app using "npx nodemon" command