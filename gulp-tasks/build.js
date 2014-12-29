var gulp = require('gulp');
var path = require('path');
var cp = require('child_process');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var traceurTransform = require(path.resolve(__dirname , '../dist/traceur-transform')).default;
var removeCss = require(path.resolve(__dirname , '../dist/remove-css')).default;
var loadMap = require(path.resolve(__dirname, '../dist/load-map')).default;
var writeMap = require(path.resolve(__dirname, '../dist/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/rm')).default;

gulp.task('harmony:build-tmp', ['harmony:test'], function (cb) {
  gulp.src('source/*.js')
    .pipe(loadMap())
    .pipe(traceurTransform({
      modules: 'commonjs',
      //generators: 'parse',
      //symbols: 'parse',
      // promises: 'parse'
    }))
    .pipe(writeMap())
    .pipe(gulp.dest('build-tmp'))
    .on('end', cb);
});

gulp.task('harmony:copy-dist', ['harmony:build-tmp', 'harmony:clean-dist'], function (cb) {
  gulp.src('build-tmp/*')
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});



gulp.task('harmony:build', ['harmony:copy-dist', 'harmony:clean-tmp'], function () {});
gulp.task('harmony:clean-dist', ['harmony:build-tmp'], function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../dist'));
    cb();
  });
});
gulp.task('harmony:clean-tmp', ['harmony:copy-dist'], function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../build-tmp'));
    cb();
  });
});
