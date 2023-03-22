// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mongo-exercises')
//   .then(() => console.log('connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...', err))

// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [ String ],
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });

// // Course class, nodeCourse instance of class Course

// const Course = mongoose.model('Course', courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: 'Angular Course',
//     author: 'Serhii Kryvenko',
//     tags: ['angular', 'frontend'],
//     isPublished: true,
//   });
//   const result = await course.save();
//   console.log(result);
// }

// async function getCourses() {
//   // eq (equal)
//   // ne (not equal)
//   // gt (greater then)
//   // gte (greater than or equal to)
//   // lt (less then)
//   // lte (less then or equal to)
//   // in 
//   // nin (not in)


//   // logical operators in Node.js 

//   // or
//   // and
  
//   // For pagination use skip
//   // /api/courses?pageNumber=27pageSize=10 
//   const pageNumber = 2;
//   const pageSize = 10;

//   const courses = await Course
//     // .find({ price: { $gte: 10, $lte: 20 }})
//     // .find({  price: { $in: [10, 15, 20] }})

//     // logical operators

//     // .find()
//     // .or([ {author: 'Serhii Kryvenko' }, { isPublished: true  } ])
//     // .and( [  ] )

//     // Starts with Serhii
//     // .find({  author: /^Serhii/ })

//     // Ends with Kryvenko
//     // .find({ author: /Kryvenko$/i })

//     // Contains Serhii
//     // .find({ author: /.*Serhii.*/i })
//     .find({ author: 'Serhii Kryvenko', isPublished: true })
//     .skip((pageNumber -1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .count()
//     // .select({ name: 1, tags: 1 });
//   console.log(courses);
// }


// getCourses()
// // createCourse();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
  });

  //  Classes and Objects
  // Course, nodeCourse
  
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    author: "Serhii",
    tags: ['angular, frontend'],
    isPublished: true,
  });
  
  const result = await course.save();
  console.log(result)
}

async function getCourses() {

  // eq (equal)
  // ne (not equal)
  // gt (greater then)
  // gte (greater than or  equal to)
  // le (less then)
  // lte (less then or equal to)
  // in 
  // nin (not in)

  // or
  // and
  const pageNumber = 2;
  const pageSize = 10;
  // /api /courses?pageNumber=2&pageSize=10

  const courses = await Course
  // .find({ price: { $gte: 10, $lte: 20} })
  // .find({ price: { $in: [10, 15, 20] } })
  
  // .find()
  // .or([ { author: 'Serhii' }, { isPublished: true } ])
  // .and([])
  
  // // Starts with ...
  // .find({ author: /^Serhii/ })
  
  // // Ends with
  // .find({author: /Kryvenko$/i })
  
  // // Contains Serhii
// .find({ author: /.*Serhii*/ })

  .find({ author: 'Serhii', isPublished: true })
  .skip((pageNumber -1) * pageSize)
  .limit(pageSize)
  .sort({name: 1})
  .select({ name: 1, tags: 1 })
  // .count(); // counts the number od docs
  console.log(courses)
}

// getCourses()
// createCourse();


async function updateCourse(id) {
  // // Approach: Query first
  // // findBy()
  // // Modify its properties
  // // save()

  // const course = await Course.findById(id)
  // if(!course) return;

  // course.isPublished = true;
  // course.author = 'Another Author';
  // // course.set({
  // //   isPublishedDate: true,
  // //   author: 'Another Author'
  // // })

  // const result = await course.save()
  // console.log(result)



  // Approach: Update First
  // Update directly
  // Optionally: get the updated document


//   const result = await Course.updateOne({ _id: id }, {
//     $set: {
//       author: 'Mosh',
//       isPublished: false
//     }
//   })

//   console.log(result);

const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Tom',
      isPublished: false
    }
  },{ new: true });

  console.log(course);
}

// updateCourse("6407346a5a22a00ed3a38efd")

async function removeCourse(id) {
  // const course = await Course.deleteOne({ _id: id });
  const result = await Course.findByIdAndRemove(id)
  console.log(result)
}

removeCourse("6407358fde3d6d2faea41577")