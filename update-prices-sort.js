const fs = require('fs');

const coursesDbPath = 'src/data/courses.json';
let courses = JSON.parse(fs.readFileSync(coursesDbPath, 'utf-8'));

// 1. Update prices
courses = courses.map(course => {
  if (course.currentPrice === 99) {
    course.originalPrice = 299;
  } else if (course.currentPrice === 149) {
    course.originalPrice = 399;
  } else if (course.id === 'bundle') {
    course.currentPrice = 999;
  }
  return course;
});

// 2. Sort the courses
const bundle = courses.find(c => c.id === 'bundle');
const regularCourses = courses.filter(c => c.id !== 'bundle');

regularCourses.sort((a, b) => a.currentPrice - b.currentPrice);

const sortedCourses = [...regularCourses];
if (bundle) {
  sortedCourses.push(bundle);
}

fs.writeFileSync(coursesDbPath, JSON.stringify(sortedCourses, null, 2));
console.log("Prices and sorting updated successfully.");
