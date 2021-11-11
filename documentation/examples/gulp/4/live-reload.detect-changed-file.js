'use strict';

const
  chokidar = require('chokidar');

const 
  importFilesScss1 = [
    'src/scss/1/_1.scss',
  ];

const 
  scss1MainFolder = 'src/scss/1/';

const
  pathWatch = './src/**/*.(js|scss|html)';

let 
  modPath;

chokidar.watch(pathWatch).on('change', (path) => {

  modPath = path.replace(/[\\]/g, '/');

  // (Way 1) Check the import files for main [SCSS - 1] 
  //if(importFilesScss1.includes(modPath)){
  //  modPath = '/css/1.css';
  //}
  
  // (Way 2) Check the import files for main [SCSS - 1]
  if(is_mainFolder(scss1MainFolder, modPath)){
    modPath = '/css/1.css';
  }
  
  modPath = modPath.replace(/^src\/scss/, '\/css');
  modPath = modPath.replace(/^src\/js/, '\/js');

  // Replace extension for .scss
  modPath = modPath.replace(/\.scss$/, '.css');

  console.log(modPath);
});


function path(){
  return modPath;	
}


function is_mainFolder(pathMainFolder, path){
  const regExp = new RegExp("^" + pathMainFolder + "[\\s\\S]+$","g");

  return regExp.test(path);
}


exports.path = path;
