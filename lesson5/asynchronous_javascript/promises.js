const p = new Promise((resolve, reject) => {
  //  Kick of Some async work ...
  setTimeout(() => {
    resolve(1); // pending => resolved, fulfilled
    reject(new Error('message')); // pending => rejected
  }, 2000)
});

p.then(res => console.log('Result', res))
.catch(err => console.log('Error', err.message))