const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesPath, (err, files) => {
  if(err) throw err;
  files.forEach((file) => {
    if(path.extname(file) === '.css') {
      const pathFile = path.join(stylesPath, file);
      const stream = fs.createReadStream(pathFile , 'utf-8');

      let data = '';

      stream.on('data', chunk => data += chunk);
      stream.on('end', () => {
        fs.appendFile(bundlePath, data, err => {
          if(err) throw err;
        });
      });

      stream.on('error', error => console.log('Error', error.message));
    }
  });
});