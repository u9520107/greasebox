import gulp from 'gulp';
import path from 'path';
import co from 'co';
import through from 'through2';

import * as gb from '../dist/index';

gulp.task('build', ['build-tmp'], (cb) => {
  gb.rm(path.resolve(__dirname, '../dist'))
    .then(() => {
      gulp.src('tmp/*')
        .pipe(gulp.dest('dist'))
        .on('finish', () => {
            gb.rm(path.resolve(__dirname, '../tmp'))
              .then(cb)
              .catch(cb);
        });
    }).catch(cb);
});

gulp.task('build-tmp', ['test'], (cb) => {
  gb.rm(path.resolve(__dirname, '../tmp'))
    .then(() => {
      gulp.src('source/*.js')
        .pipe(gb.loadMap())
        .pipe(gb.to5Transform({
          blacklist: [
            'regenerator'
          ],
          optional: [
            'selfContained'
          ]
        }))
        .pipe(gb.writeMap())
        .pipe(gulp.dest('tmp'))
        .on('error', cb)
        .on('finish', cb);
    }).catch(cb);
});

