import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import cp from 'child_process';
import chalk from 'chalk';

const taskFile = /^[A-Za-z].*\.js$/i;

export default function gulpstrap (){
  if(!global._babelPolyfill) {
    require('babel/register')({
      stage: 0
    });
  }
  let dirname = process.cwd();
  fs.readdirSync('gulp-tasks').forEach(function(task) {
    if(/^[A-Za-z].*\.js$/i.test(task)) {
      require(path.resolve(dirname, 'gulp-tasks', task));
    }
  });
}
