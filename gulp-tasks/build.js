var gulp = require('gulp');
var path = require('path');
var cp = require('child_process');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var traceurTransform = require(path.resolve(__dirname , '../dist/node/traceur-transform')).default;
var removeCss = require(path.resolve(__dirname , '../dist/node/remove-css')).default;
var loadMap = require(path.resolve(__dirname, '../dist/node/load-map')).default;
var writeMap = require(path.resolve(__dirname, '../dist/node/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

gulp.task('build-gulp-tools', ['test-gulp-tools'], function (cb) {
  gulp.src('source/node/*.js')
    .pipe(loadMap())
    .pipe(traceurTransform({
      modules: 'commonjs',
      generators: 'parse',
      symbols: 'parse',
      promises: 'parse'
    }))
    .pipe(writeMap())
    .pipe(gulp.dest('dist/node'))
    .on('end', cb);

});

gulp.task('clean', function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../dist'));
    cb();
  });
});
