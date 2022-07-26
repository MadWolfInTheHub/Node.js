const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Serhii Kryvenko',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
};

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ isPublished: true })
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}


async function removeCourse(id) {

  // const result = await Course.deleteMany({ _id: id });
  // const course = await Course.findByIdAndRemove(id);


  console.log(course);
}

removeCourse('62e5ea24c912c9c59fb99dde');
// getCourses()
// createCourse();