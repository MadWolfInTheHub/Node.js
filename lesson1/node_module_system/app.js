// const x=;
// function sayHello(name) {
//   console.log(`Hello ${name}`)
// }

// // sayHello("Serhii")
// console.log(window)


// Lesson 2
// console.log(module);

// const logger = require('./logger')
// console.log(logger)


// const log = require('./logger')
// log('message',)

// const path = require('path');

// const pathObj = path.parse(__filename);

// console.log(pathObj)

// const os = require('os');

// console.log(os.totalmem())

// const fs = require('fs');

// const files = fs.readdirSync('./');

// console.log(files);

// fs.readdir("$", function(err, files) {
//   if(err) console.log('Error', err);
//   else console.log('Result', files);
// })

// Produce something

const EventEmitter = require('events');
const { emit } = require('process');

const emitter = new EventEmitter();
emitter.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

emitter.emit('messageLogged', {id: 1, url: 'http://'});

// Raise an event: logging (data: message)