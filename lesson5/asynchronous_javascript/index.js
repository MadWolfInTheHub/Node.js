// Promise approach

// console.log('Before');

// getUser(1)
//   .then(user => getRepositories(user.githubUsername))
//   .then(repo => getCommits(repo[0]))
//   .then(commits => console.log('Commits', commits))
//   .catch(err => console.log('Error', err.message));

// console.log('After');

// Async and Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log('Error', err.message)
  }
}
displayCommits()
// 

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database');
      resolve({id: id, githubUsername: 'Serhii Kryvenko'});
    }, 2000);
  });
};

function getRepositories(userName, callback) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading a ${userName}'s repository from a database`);
      reject(new Error('could not get the repos.'))
      // resolve(['repo1', 'repo2', 'repo3'])
    }, 3000);
  });
};


function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...')
      resolve(['commit'])
    }, 2000);
  });
}



// Async and Await approach

