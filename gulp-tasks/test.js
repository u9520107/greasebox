var gulp = require('gulp');
var path = require('path');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var through = require('through2');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var traceurInstrumenter = require(path.resolve(__dirname, '../dist/traceur-instrumenter')).default;
var defaultIstanbul = require('gulp-istanbul/node_modules/istanbul');
defaultIstanbul.Instrumenter = traceurInstrumenter;


gulp.task('harmony:test', function(cb) {
  gulp.src(['source/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .on('finish', function() {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function(err) {
          cb(err);
        });
    });
});
