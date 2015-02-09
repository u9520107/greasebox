import gulp from 'gulp';
import path from 'path';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import through from 'through2';
import esp from 'esprima-fb';

import defaultIstanbul from 'gulp-istanbul/node_modules/istanbul';
import To5Instrumenter from '../dist/to5-instrumenter';

defaultIstanbul.Instrumenter = To5Instrumenter;

gulp.task('test', (cb) => {
  gulp.src(['source/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .on('error', cb)
    .on('finish', () => {
      gulp.src(['test/*.js'])
      .pipe(mocha())
      .pipe(istanbul.writeReports())
      .on('error', cb)
      .on('end', cb);
    });
});

