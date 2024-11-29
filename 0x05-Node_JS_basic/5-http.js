const http = require('http');
const fs = require('fs');
const url = require('url');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

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
      let result = `Number of students: ${totalStudents}\n`;
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          result += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
        }
      }

      resolve(result.trim());
    });
  });
}

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (path === '/students') {
    const databasePath = process.argv[2];
    countStudents(databasePath)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`This is the list of our students\n${result}`);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
