process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', () => {
  const name = process.stdin.read();
  process.stdout.write(`Your name is: ${name}`);
  process.exit();
});

process.on('exit', () => {
  console.log('This important software is now closing\n');
});
