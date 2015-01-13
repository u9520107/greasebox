var gulp = require('gulp');
var path = require('path');
var cp = require('child_process');
var co = require('co');
var through = require('through2');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var traceurTransform = require(path.resolve(__dirname , '../dist/traceur-transform')).default;
var removeCss = require(path.resolve(__dirname , '../dist/remove-css')).default;
var loadMap = require(path.resolve(__dirname, '../dist/load-map')).default;
var writeMap = require(path.resolve(__dirname, '../dist/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/rm')).default;
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;

gulp.task('harmony:build-tmp', ['harmony:test'], function (cb) {
  gulp.src(['source/*.js', '!source/cli.js'])
    .pipe(loadMap())
    .pipe(traceurTransform({
      modules: 'commonjs',
      generators: 'parse',
      symbols: 'parse',
      promises: 'parse'
    }))
    .pipe(writeMap())
    .pipe(gulp.dest('build-tmp'))
    .on('end', cb);
});
gulp.task('harmony:build:cli', ['harmony:test', 'harmony:clean:cli'], function (cb) {
  gulp.src(['source/*.js'])
    .pipe(traceurTransform({
      modules: 'commonjs'
    }))
    .pipe(through.obj(function (file, enc, next){
      if(/cli-loader\.js$/i.test(file.path)) {
        var output = '#!/usr/bin/env node\n\n';
        file.contents = new Buffer(output + file.contents.toString((enc)));
      }
      this.push(file);
      next();
    }))
    .pipe(gulp.dest('cli'))
    .on('end', function () {
      co(function * () {
        try {
        if(yield cofs.exists('cli/cli-loader.js')) {
          yield cofs.chmod(path.resolve(__dirname, '../cli/cli-loader.js'), '0755');
        }
        cb();
        } catch(err) {
          cb(err);
        }
      });
    });
});

gulp.task('harmony:copy-dist', ['harmony:build-tmp', 'harmony:clean-dist'], function (cb) {
  gulp.src('build-tmp/*')
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});



gulp.task('harmony:build', ['harmony:copy-dist', 'harmony:clean-tmp', 'harmony:build:cli'], function () {});
gulp.task('harmony:clean-dist', ['harmony:build-tmp'], function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../dist'));
    cb();
  });
});
gulp.task('harmony:clean-tmp', ['harmony:copy-dist'], function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../build-tmp'));
    cb();
  });
});
gulp.task('harmony:clean:cli', ['harmony:copy-dist'], function (cb) {
  co(function * (){
    yield rm(path.resolve(__dirname, '../cli'));
    cb();
  });
});
