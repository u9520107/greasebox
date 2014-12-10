var gulp = require('gulp');
var path = require('path');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var istanbulTraceur = require('istanbul-traceur');
var through = require('through2');
var traceur = require('traceur');
require(traceur.RUNTIME_PATH);
var traceurInstrumenter = require(path.resolve(__dirname, '../dist/node/traceur-instrumenter')).default;


gulp.task('test-gulp-tools', function (cb) {
  var defaultIstanbul = require('gulp-istanbul/node_modules/istanbul');
  //var defaultInstrumenter = defaultIstanbul.Instrumenter;

  //defaultIstanbul.Instrumenter = istanbulTraceur.Instrumenter;
  //var loadMap = require(path.resolve(__dirname, '../dist/node/load-map')).default;
  //
  defaultIstanbul.Instrumenter = traceurInstrumenter;
  gulp.src(['source/**/*.js'])
  //.pipe(loadMap())
  .pipe(istanbul({
  }))
  
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function (err) {
          //defaultIstanbul.Instrumenter = defaultInstrumenter;
          cb(err);
        });
    });
});
