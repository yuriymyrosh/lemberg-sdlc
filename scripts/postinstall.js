const fs = require('fs');
const path = require('path');
const { copyFileSync, ensureDirSync } = require('fs-extra');

const sourceDir = path.join(__dirname, '..', 'node_modules', 'lemberg-sdlc', '_github');
const destinationDir = path.join(__dirname, '..', '.github');

function copyFiles(sourcePath, destinationPath) {
  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    const sourceFilePath = path.join(sourcePath, file);
    const destinationFilePath = path.join(destinationPath, file);

    if (fs.statSync(sourceFilePath).isDirectory()) {
      ensureDirSync(destinationFilePath);
      copyFiles(sourceFilePath, destinationFilePath);
    } else {
      if (fs.existsSync(destinationFilePath)) {
        
      } else {
        copyFileSync(sourceFilePath, destinationFilePath);
        console.log(`File "${file}" has been added to project`);
      }
    }
  });
}

copyFiles(sourceDir, destinationDir);