const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  tags: [ String ],
  price: Number,
  date: {type: Date, default: Date.now},
});

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
  return await Course
    // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
    .find({ isPublished: true } )
    .or([{tags: 'backend'}, { tags: 'frontend'}])
    .sort({ price: -1 })
    .select({ name:1, author: 1})
}

async function run() {
  const courses = await getCourse()
  console.log(courses)
}

run()