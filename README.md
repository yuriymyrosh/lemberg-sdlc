# Lemberg Solutions Javascript Department SDLC module 

This module contains SDLC artifacts for Javascript Department.

## How to install

1. ```sh 
    npm intall lemberg_sdlc:git@github.com:yuriymyrosh/lemberg-sdlc.git husky @commitlint/config-conventional @commitlint/cli --save-dev
    ```
    After the installation is complete `postinstall` script will copy all artifacts from _github folder in your project `.github` folder. Please note that script will not replace the already existing file. So if you already have some github hooks/templates/workflows configured and want to replace them with this module, please remove them manually from your projects folder.

    ---
    Note: Don't use this module if you have another development process on your project.

2. ```sh 
    npx husky install
    ```
  To install husky git hooks

## Includes:

* Github PR template
* Github actions for linting, building and testing applications
* Pre push git hooks that check branch naming
* Pre commit git hooks