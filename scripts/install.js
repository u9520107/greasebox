var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
require('babel-core/register');

var gb = require(path.resolve(__dirname, '../source/index'));

if(!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  gulp.src('source/*.js')
  .pipe(gb.loadMap())
  .pipe(gb.babelTransform())
  .pipe(gb.writeMap())
  .pipe(gulp.dest('dist'));
}
