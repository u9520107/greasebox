var gulp = require('gulp');
var path = require('path');
var co = require('co');



var jsxFormatter = require(path.resolve(__dirname , '../dist/jsx-formatter')).default;

gulp.task('harmony:format', function (cb) {
  gulp.src('source/*.js')
    .pipe(jsxFormatter())
    .pipe(gulp.dest('source'))
    .on('end', cb);
});
