import gulp from 'gulp';
import path from 'path';
import co from 'co';

import * as gb from '../dist/index';

gulp.task('build', ['test'], (cb) => {
  gb.rm(path.resolve(__dirname, '../dist'))
    .then(() => {
      gulp.src('source/*.js')
        .pipe(gulp.dest('dist'))
        .on('finish', cb)
        .on('error', cb);
    }).catch(cb);
});

