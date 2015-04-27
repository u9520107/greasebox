var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

if(!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  gulp.src('source/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      modules: 'common',
      optional: ['runtime']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}
