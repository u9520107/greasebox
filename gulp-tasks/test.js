var gulp = require('gulp');
var path = require('path');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var through = require('through2');
var esp = require('esprima-fb');
require('6to5/polyfill');

var defaultIstanbul = require('gulp-istanbul/node_modules/istanbul');
var To5Instrumenter = require(path.resolve(__dirname, '../dist/to5-instrumenter'));
defaultIstanbul.Instrumenter = To5Instrumenter;

gulp.task('harmony:test', function(cb) {
  if(false) {
    cb();
  }else {
    gulp.src(['source/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .on('error', function (err) {
      console.log(err);
      cb(err);
    })
    .on('finish', function() {
      gulp.src(['test/*.js'])
      .pipe(mocha())
      .pipe(istanbul.writeReports())
      .on('end', function(err) {
        cb(err);
      });
    });
  }
});
