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

gulp.task('build-gulp-tools', ['clean'], function (cb) {
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
    .on('end', function () {
      //can't simply spawn gulp, breaks on windows (https://github.com/joyent/node/issues/2318)
      var p = cp.spawn('node', ['--harmony', 'node_modules/gulp/bin/gulp', 'test'], {
        stdio: 'inherit'
      });
      p.on('error', function (err) {
        console.log(err);
        cb();
      });
      p.on('exit', cb);
    });

});

gulp.task('clean', function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../dist'));
    cb();
  });
});
