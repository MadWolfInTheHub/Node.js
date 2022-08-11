//  Trade off between query performance avs consistency

// Using References (Normalization) -> consistency
let author = {
  name: 'Serhii'
}

let course = {
  author: 'id',
}



// Using Embedded Documents (Denormalization) -> performance 
let course1 = {
  author: {
    name:  'Serhii'
  }
}


// Hybrid 

let author2 = {
  name: 'Serhii',
  // 50 other properties
}

let course2 = {
  author: {
    id: 'ref',
    name: "Serhii",
  },
}