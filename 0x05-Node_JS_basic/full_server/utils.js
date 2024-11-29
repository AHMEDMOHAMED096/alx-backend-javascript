import fs from 'fs/promises';

export default async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n');
    const fields = {};

    lines.forEach((line) => {
      const [firstname, field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    return fields;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
