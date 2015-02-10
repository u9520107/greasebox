import gulp from 'gulp';
import path from 'path';
import co from 'co';
import through from 'through2';

import rm from '../dist/rm';

gulp.task('build', ['test'], (cb) => {
  rm(path.resolve(__dirname, '../dist'))
    .then(() => {
      gulp.src('source/*.js')
        .pipe(gulp.dest('dist'))
        .on('error', cb)
        .on('finish', cb);
    })
    .catch(cb);
});
