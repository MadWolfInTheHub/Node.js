const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: {
  //   type: authorSchema,
  //   required: true,
  // },
  authors: [authorSchema],
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    $unset: {
      'author': '',
    }
  });
  // course.author.name = 'Serhii Kryvenko';
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('6409b89ea58ae4d410d2481a', '6409b89ea58ae4d410d24819');

// addAuthor('6409b89ea58ae4d410d2481a', new Author({ name: "Amy"}));
// createCourse('Node JS')

// createCourse('Node Course', [
//   new Author({ name: 'Serhii' }),
//   new Author({ name: 'John' }),
// ]);
// updateAuthor('62f3347b0f1d45779bec78ac');