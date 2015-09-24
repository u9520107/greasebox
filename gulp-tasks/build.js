import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';
import rm from '../source/rm';


gulp.task('build', () => {
  return gulp.src('source/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0,
      optional: ['runtime']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

