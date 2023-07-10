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

function copyFiles(sourceDir, destinationDir) {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.log(`Folder "${sourceDir}" was not found in your npm module`);
      return;
    }

    fs.mkdirSync(destinationDir, { recursive: true });
    copyFilesRecursive(sourceDir, destinationDir);
  } catch (error) {
    console.error('Error:', error);
  }
}

function copyFile(sourceFilePath, destinationFilePath) {
  try {
    if (!fs.existsSync(sourceFilePath)) {
      console.log(`File "${sourceFilePath}" was not found in your npm module`);
      return;
    }

    if (fs.existsSync(destinationFilePath)) {
      console.log(`File "${sourceFilePath}" was already found in source`);
      return;
    }

    fs.copyFileSync(sourceFilePath, destinationFilePath);
  } catch (error) {
    console.error('Error:', error);
  }
}

const packageRoot = path.resolve(__dirname, '..');

copyFiles(path.join(packageRoot, '_github'), path.join(packageRoot, '..', '..', '.github'));
copyFiles(path.join(packageRoot, '_husky'), path.join(packageRoot, '..', '..', '.husky'));
copyFile(path.join(packageRoot, 'commitlint.config.js'), path.join(packageRoot, '..', '..', 'commitlint.config.js'));
