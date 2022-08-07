
// const p = Promise.resolve({ id: 1, });
// p.then(result => console.log(result));

// const pp = Promise.reject(new Error('reason for rejecting'));
// pp.catch(error => console.log(error.message));

const p1 = new Promise((resolve) =>{
  setTimeout(() => {
    console.log('Async operation 1...');
    // reject(new Error('because smt failed'));
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) =>{
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve(2);
  }, 2000);
});

Promise.race([p1, p2])
  .then(result =>console.log(result))
  .catch(error =>console.log(error.message));