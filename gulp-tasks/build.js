import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';
import { rm, cofs } from '../dist/index';

gulp.task('build', ['build:tmp'], (cb) => {
  gulp.src('tmp/*')
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      rm(path.resolve(__dirname, '../tmp'))
        .then(cb);
    })
    .on('error', cb);
});

gulp.task('build:tmp', ['test'], () => {
  return gulp.src('source/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      modules: 'common',
      optional: ['runtime']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('tmp'));
});

