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
        console.log(`Файл "${file}" вже існує в корені проекту`);
      } else {
        fs.copyFileSync(sourceFilePath, destinationFilePath);
        console.log(`Файл "${file}" скопійовано в корінь проекту`);
      }
    }
  });
}

function copyFiles() {
  try {
    const packageRoot = __dirname;
    const sourceDir = path.join(packageRoot, '_github');
    const destinationDir = path.join(packageRoot, '.github');

    if (!fs.existsSync(sourceDir)) {
      console.log('Папка "_github" не знайдена у вашому npm-пакеті');
      return;
    }

    fs.mkdirSync(destinationDir, { recursive: true });
    copyFilesRecursive(sourceDir, destinationDir);
  } catch (error) {
    console.error('Помилка:', error);
  }
}

copyFiles();