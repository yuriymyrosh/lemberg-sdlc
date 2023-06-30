const fs = require('fs');
const path = require('path');
const { copyFileSync, ensureDirSync } = require('fs');

function copyFiles() {
  try {
    const packageRoot = __dirname;
    const sourceDir = path.join(packageRoot, '_github');
    const destinationDir = path.join(packageRoot, '.github');

    if (!fs.existsSync(sourceDir)) {
      console.log('Папка "_github" не знайдена у вашому npm-пакеті');
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
          console.log(`Файл "${file}" вже існує в корені проекту`);
        } else {
          copyFileSync(sourceFilePath, destinationFilePath);
          console.log(`Файл "${file}" скопійовано в корінь проекту`);
        }
      }
    });
  } catch (error) {
    console.error('Помилка:', error);
  }
}

copyFiles();