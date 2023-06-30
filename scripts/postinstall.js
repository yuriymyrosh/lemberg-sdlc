const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-dir');
const { copyFileSync, ensureDirSync } = require('fs-extra');

async function copyFiles() {
  try {
    const packageRoot = await pkgDir(__dirname);
    const sourceDir = path.join(packageRoot, '_github');
    const destinationDir = path.join(packageRoot, '.github');

    if (!fs.existsSync(sourceDir)) {
      console.log('Directory "_github" was not found in your pakage');
      return;
    }

    const files = fs.readdirSync(sourceDir);

    files.forEach((file) => {
      const sourceFilePath = path.join(sourceDir, file);
      const destinationFilePath = path.join(destinationDir, file);

      if (fs.statSync(sourceFilePath).isDirectory()) {
        ensureDirSync(destinationFilePath);
        copyFilesRecursive(sourceFilePath, destinationFilePath);
      } else {
        if (fs.existsSync(destinationFilePath)) {
          console.log(`File "${file}" already exists in project`);
        } else {
          copyFileSync(sourceFilePath, destinationFilePath);
          console.log(`File "${file}" has been added to project`);
        }
      }
    });
  } catch (error) {
    console.error('Помилка:', error);
  }
}

copyFiles();
