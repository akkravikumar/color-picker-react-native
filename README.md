# Drag and Drop color selector in React Native
Drag and Drop color selector in react native

![Drag & Drop color selector](https://i.imgur.com/inehBIf.gif)

[Source Code Github](https://github.com/akkravikumar/color-picker-react-native)


# CRA-ReactNative

React Native Project for Collision Reporter App (CRA)

# Project structure

This is a sample template for CRA-app - Below is a brief explanation of what we have generated for you:

```bash
.
├── android                   <-- This folder contains andfoid files
├── assets                    <-- This folder contains assets like images
├── ios                       <-- This contains ios files
├── node_modules              <-- This folder contains list of library installed
├── src                       <-- Source code for a react native app
├   ├── component             <-- common component of screen source code
├   ├── mockData              <-- This folder contains mock json files
├   ├── screens               <-- This for screens folder
├   ├── utils                 <-- utils folder
├── router.js                 <-- Navigation file
├── .eslintrc.js              <-- React Native specific linting rules
├── package.json              <-- This file configure the library with react native app
```

## Requirements
- [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
- [React Native installed cli](https://reactnative.dev/blog/2017/03/13/introducing-create-react-native-app)
- [XCode installed](https://apps.apple.com/in/app/xcode/id497799835?mt=12)
- [Android Studio along with SDK installed](https://developer.android.com/studio)
- [Visual Studio Code installed](https://code.visualstudio.com/download)
- Command line tools in XCode

## Setup process

### Building the project

React-Native application run with its dependencies in a node_modules folder. When you make changes to your source code or dependency manifest,
run the following command step by step in terminal to build your project local testing and deployment:

```bash
> npm install
> react-native link
> cd ios
> pod install
> cd ..
> react-native run-ios
```

---

## Clone a repository

Use these steps to clone from Gitlab, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you prefer to clone from the command line, see [Clone a repository](https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html).