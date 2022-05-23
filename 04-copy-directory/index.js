const fs = require('fs');
const path = require('path');

const pathName = path.join(__dirname, 'files');
const copiedPath = path.join(__dirname, 'files-copy');

fs.promises.mkdir(copiedPath, {recursive: true}, err => {
  if(err) throw err;
});

fs.readdir(pathName, 'utf-8', (err, files ) => {
  if(err) throw err;
  for(let file of files) {
    fs.copyFile((path.join(pathName, file)), (path.join(copiedPath, file)), err => {
      if(err) throw err;
    });
  }
  fs.readdir(copiedPath, 'utf-8', (err, copiedFiles ) => {
    if(err) throw err;
    copiedFiles.forEach(copiedFile => {
      if(!files.includes(copiedFile)) {
        fs.unlink(path.join(copiedPath, copiedFile), err => {
          if(err) throw err;
        });
      }
    });
  });
});

