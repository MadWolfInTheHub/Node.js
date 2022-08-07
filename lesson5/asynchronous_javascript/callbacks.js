// Callbacks

  // Callback HEll
console.log('Before');
getUser(1, (user) => {
  getRepositories(user.githubUsername, (repo) => {
    getCommits(repo, (commits) => {
      console.log(commits);

    });
    console.log('Repos', repo)
  });
});
console.log('After');


function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database');
    callback({id: id, githubUsername: 'Serhii Kryvenko'});
  }, 2000);
};

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log(`Reading a ${userName}'s repository from a database`);
    callback(['repo1', 'repo2', 'repo3'])
  }, 3000)
};

// Solution for callBack Hell
// Simply we need to write named functions instead of anonymous functions

console.log('Before');
getUser(1, getRepositories);
console.log('After');

function getRepositories(user) {
  getRepositories(user.githubUsername, displayCommits);
}

function displayRepos(repo) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
};

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database');
    callback({id: id, githubUsername: 'Serhii Kryvenko'});
  }, 2000);
};

function getRepositories(userName, callback) {
  setTimeout(() => {
    console.log(`Reading a ${userName}'s repository from a database`);
    callback(['repo1', 'repo2', 'repo3'])
  }, 3000)
};

// Promises

// Async/await