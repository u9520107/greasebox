import gulp from 'gulp';
import fs from 'fs';
import path from 'path';

let sourceDir = path.resolve(__dirname, '../source');

gulp.task('install', (cb) => {
  if(!fs.existsSync(sourceDir)) {
    gulp.src('dist/*.js')
    .pipe(gulp.dest('source'))
    .on('error', cb)
    .on('finish', () => {
      console.log('install complete');
      cb();
    });
  }
});
