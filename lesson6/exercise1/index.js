const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to courses database...'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find( { tags: 'backend', isPublished: true } )
    .sort({ name: 1 })
    .select({ name:1, author: 1});
};

async function getDescendingOrder(){
  return await Course
  .find({ tags: {$in: ['backend', 'frontend']}, isPublished: true })
  .sort({price: -1})
  .select({ name: 1, author: 1 });
}

async function getCoursesGreaterThen() {
  return await Course
  .find({ isPublished: true })
  .or([
    { price: {$gte: 15} }, 
    { name: /.*by.*/i }
  ]);
}

async function run() {
  const courses = await getCourses()
  const descentCourses = await getDescendingOrder()
  const amountGreaterThen = await getCoursesGreaterThen()
  // console.log(courses)
  // console.log(descentCourses)
  console.log(amountGreaterThen)
}

run()