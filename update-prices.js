const fs = require('fs');

const coursesDbPath = 'src/data/courses.json';
let courses = JSON.parse(fs.readFileSync(coursesDbPath, 'utf-8'));

const price99 = ['c1', 'c2', 'c3', 'c4', 'c8', 'c6', 'c13', 'c12'];
const price149 = ['c5', 'c7', 'c9', 'c10', 'c11', 'c14', 'c15', 'c16', 'c19', 'c20', 'c21', 'c22'];
const price499 = ['c17', 'c18', 'c23', 'c24'];

courses = courses.map(course => {
  if (price99.includes(course.id)) {
    course.currentPrice = 99;
    course.originalPrice = 199;
  } else if (price149.includes(course.id)) {
    course.currentPrice = 149;
    course.originalPrice = 299;
  } else if (price499.includes(course.id)) {
    course.currentPrice = 499;
    course.originalPrice = 999;
  }
  return course;
});

fs.writeFileSync(coursesDbPath, JSON.stringify(courses, null, 2));
console.log("Prices updated successfully.");
