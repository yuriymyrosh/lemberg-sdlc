const fs = require('fs');
const path = require('path');

function copyFilesRecursive(sourceDir, destinationDir) {
  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourceFilePath = path.join(sourceDir, file);
    const destinationFilePath = path.join(destinationDir, file);

    if (fs.statSync(sourceFilePath).isDirectory()) {
      fs.mkdirSync(destinationFilePath, { recursive: true });
      copyFilesRecursive(sourceFilePath, destinationFilePath);
    } else {
      if (fs.existsSync(destinationFilePath)) {
        console.log(`File "${file}" already exist`);
      } else {
        fs.copyFileSync(sourceFilePath, destinationFilePath);
        console.log(`File "${file}" was copied succesfully`);
      }
    }
  });
}

function copyFiles() {
  try {
    const packageRoot = path.resolve(__dirname, '..');
    const sourceDir = path.join(packageRoot, '_github');
    const destinationDir = path.join(packageRoot, '..', '..', '.github');

    if (!fs.existsSync(sourceDir)) {
      console.log('Folder "_github" was not found in your npm module');
      return;
    }

    fs.mkdirSync(destinationDir, { recursive: true });
    copyFilesRecursive(sourceDir, destinationDir);
  } catch (error) {
    console.error('Error:', error);
  }
}

copyFiles();
