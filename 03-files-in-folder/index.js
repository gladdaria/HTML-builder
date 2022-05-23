const fs = require ('fs');
const path = require('path');
const pathName = path.join(__dirname, 'secret-folder');

fs.readdir(pathName, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  } else {
    for(let file of files) {
      if(file.isFile()) {
        const pathFile = path.join(pathName, file.name);
        const fileExtension = path.extname(file.name).slice(1);
        const fileName = path.parse(file.name).name;
        fs.stat(pathFile, (err, stats) => {
          if (err) {
            throw err;
          } else {
            console.log(`${fileName} - ${fileExtension} - ${stats.size}b`);
          }
        });
      }
    }
  }
});
