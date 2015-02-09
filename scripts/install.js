#!/usr/bin/env node
var gulp = require('gulp');
var fs = require('fs');

if(!fs.existsSync('source')) {
  gulp.src(['dist/*'])
  .pipe(gulp.dest('source'))
  .on('error', console.log)
  .on('finish', function () {
    console.log('Install complete');
  });
}
