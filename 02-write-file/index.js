const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

const pathName = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(pathName);

stdout.write('Please, type your text\n');
stdin.on('data', data => {
  const dataStringified = data.toString().trim();
  if(dataStringified === 'exit') {
    process.exit();
  } else {
    stream.write(data);
  }
});
process.on('exit', () => stdout.write('\nBye bye!'));
process.on('SIGINT', () => process.exit());
