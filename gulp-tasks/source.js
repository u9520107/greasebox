import gulp from 'gulp';
import path from 'path';
import co from 'co';

import * as gb from '../dist/index';

gulp.task('clone-source', (cb) => {
  co(function* () {
    if(!yield gb.cofs.exists(path.resolve(__dirname, '../source'))) {
      gulp.src(['dist/*.js'])
        .pipe(gulp.dest('source'))
        .on('error', cb)
        .on('finish', cb);
    } else {
      cb();
    }
  }).catch(cb);
});

gulp.task('clean-source', (cb) => {
  gb.rm(path.resolve(__dirname, '../source'))
  .then(cb)
  .catch(cb);

});
