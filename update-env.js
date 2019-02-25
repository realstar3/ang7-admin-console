require('dotenv').config();
const fs = require('fs');
const filePath = './src/environments/environment.prod.ts';

console.log('>> Replacing ENV');

const file = fs.readFileSync(filePath, 'utf8');

if (file) {
  const env = process.env.ADMIN_BACKEND;

  if (env) {
    const result = file.replace('ADMIN_BACKEND', env);

    fs.writeFileSync(filePath, result);

    console.log('>> Finished replacing ENV');
  } else {
    console.log('>> No env variable');
  }
} else {
  console.log('>> No file found for replacing ENV');
}
