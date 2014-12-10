var gulp = require('gulp');
var path = require('path');
var cp = require('child_process');

gulp.task('build-gulp-tools', function (cb) {
  var nodeTransform = require(path.resolve(__dirname , '../dist/node/node-transform')).default;
  var loadMap = require(path.resolve(__dirname, '../dist/node/load-map')).default;
  var writeMap = require(path.resolve(__dirname, '../dist/node/write-map')).default;
  gulp.src('source/node/*.js')
    .pipe(loadMap())
    .pipe(nodeTransform())
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
