const EventEmitter = require('events');
const emitter = new EventEmitter;

// Register a listener 

emitter.on('messageLogged', (args) => {
  console.log('logging', args);
});

//  Raise an event

emitter.emit('messageLogged', {data: 'message'})