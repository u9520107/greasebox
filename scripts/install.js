#!/usr/bin/env node

var gulp = require('gulp');
var to5 = require('6to5');
var path = require('path');
var fs = require('fs');
to5.register();

var gb = require(path.resolve(__dirname, '../source/index'));

if(!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  gulp.src('source/*.js')
  .pipe(gb.loadMap())
  .pipe(gb.to5Transform({
    optional: ['selfContained']
  }))
  .pipe(gb.writeMap())
  .pipe(gulp.dest('dist'));
}
