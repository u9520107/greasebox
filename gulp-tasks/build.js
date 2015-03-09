import gulp from 'gulp';
import path from 'path';
import co from 'co';

import * as gb from '../dist/index';

gulp.task('build', ['build-tmp'], (cb) => {
  co(function * () {
      yield gb.rm(path.resolve(__dirname, '../dist'));
      yield new Promise(function (resolve, reject) {
        gulp.src('tmp/*')
          .pipe(gulp.dest('dist'))
          .on('finish', resolve)
          .on('error', reject);
      });
      yield gb.rm(path.resolve(__dirname, '../tmp'));
  }).then(cb)
    .catch(cb);
});


gulp.task('build-tmp', ['test'], (cb) => {
  gb.rm(path.resolve(__dirname, '../tmp'))
    .then(() => {
      gulp.src('source/*.js')
        .pipe(gb.loadMap())
        .pipe(gb.babelTransform({
          optional: ['runtime']
        }))
        .pipe(gb.writeMap())
        .pipe(gulp.dest('tmp'))
        .on('finish', cb)
        .on('error', cb);
    })
    .catch(cb);
});
