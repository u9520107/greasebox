var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var loadMap = require(path.resolve(__dirname, '../source/node/load-map')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

describe('loadMap', function() {
  it('should be a function ', function () {
    expect(loadMap).to.be.a('function');
  });

  it('should accept 1 parameter', function () {
    expect(loadMap.length).to.be.equal(1);
  });
  
  it('should return an stream-reader', function() {
    obj = loadMap();
    expect(obj).to.be.a('object');
    expect(obj.writable).to.equal(true);
  });

  it('should set the sourceMap property to files', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
    .pipe(loadMap())
    .pipe(through.obj(function (file, enc, next){
      try {
        expect(file.sourceMap).to.exist();
        next();
      } catch(err) {
        next(err);
      }
    }))
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', cb);
  });
  
  it('should read from source map files', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/sourcemap/a.js'))
    .pipe(loadMap())
    .pipe(through.obj(function (file, enc, next){
      try {
        expect(file.sourceMap).to.exist();
        expect(file.sourceMap.isValid).to.equal(true);
        next();
      } catch(err) {
        next(err);
      }
    }))
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', cb);
  });
  
  it('should work with custom extensions', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/sourcemap/c.js'))
    .pipe(loadMap('.something'))
    .pipe(through.obj(function (file, enc, next){
      try {
        expect(file.sourceMap).to.exist();
        expect(file.sourceMap.isValid).to.equal(true);
        next();
      } catch(err) {
        next(err);
      }
    }))
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', cb);
  });
  
  it('should throw error if failed to parse source map file', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/sourcemap/b.js'))
    .pipe(loadMap())
    .on('error', function (err) {
      try {
        expect(err).to.exist();
        cb();
      } catch(e) {
        cb(e);
      }
    })
    .on('finish', function () {
      cb(new Error('no error was thrown'));
    });
  });

  it('should work with globs', function (cb) {
    var pass = true;
    gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
    .pipe(loadMap())
    .pipe(through.obj(function (file, enc, next){
      if(!file.isNull() && !file.sourceMap) {
        pass = false;
      }
      next();
    }))
    .on('finish', function () {
      if(pass) {
        cb();
      } else {
        cb(new Error('some source maps are missing'));
      }
    });
  });
});

