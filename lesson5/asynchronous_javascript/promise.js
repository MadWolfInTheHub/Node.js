const p = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...
  setTimeout(() => {
    resolve(1); // pending => resolve, fulfilled
    reject(new Error('Message')) // pending => rejected
  }, 2000)
  // return resolve or reject
});

p
  .then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message))