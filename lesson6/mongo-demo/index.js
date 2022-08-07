const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Course class, nodeCourse instance of class Course

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
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater then)
  // gte (greater than or equal to)
  // lt (less then)
  // lte (less then or equal to)
  // in 
  // nin (not in)


  // logical operators in Node.js 

  // or
  // and
  
  // For pagination use skip
  // /api/courses?pageNumber=27pageSize=10 
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ price: { $gte: 10, $lte: 20 }})
    // .find({  price: { $in: [10, 15, 20] }})

    // logical operators

    // .find()
    // .or([ {author: 'Serhii Kryvenko' }, { isPublished: true  } ])
    // .and( [  ] )

    // Starts with Serhii
    // .find({  author: /^Serhii/ })

    // Ends with Kryvenko
    // .find({ author: /Kryvenko$/i })

    // Contains Serhii
    // .find({ author: /.*Serhii.*/i })
    .find({ author: 'Serhii Kryvenko', isPublished: true })
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .count()
    // .select({ name: 1, tags: 1 });
  console.log(courses);
}


getCourses()
// createCourse();