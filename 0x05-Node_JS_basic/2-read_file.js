const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));

    const fields = {};
    students.forEach((student) => {
      const field = student[3];
      if (!Object.prototype.hasOwnProperty.call(fields, field)) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    });

    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
