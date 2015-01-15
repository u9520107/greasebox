var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');


var writeMap = require(path.resolve(__dirname, '../source/write-map'));
var rm = require(path.resolve(__dirname, '../dist/rm'));
var loadMap = require(path.resolve(__dirname, '../dist/load-map'));
var cofs = require(path.resolve(__dirname, '../dist/cofs'));
var to5Transform = require(path.resolve(__dirname, '../dist/to5-transform'));
var removeCss = require(path.resolve(__dirname, '../dist/remove-css'));

describe('writeMap', function() {
  it('should be a function', function () {
    expect(writeMap).to.be.a('function');
  });

  it('should return a writable object', function () {
    var obj = writeMap();
    expect(obj).to.exist();
    expect(obj.writable).to.equal(true);
  });

  it('should skip files without sourceMap property', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(writeMap())
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', cb);

  });

  //folders are often passed into the pipe by gulp.src as null files
  it('should deal with null files', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
    .pipe(writeMap())
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', cb);

  });

  it('should work with globs', function (cb) {
    var files = {};
    gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
    .pipe(loadMap())
    .pipe(through.obj(function (file, enc, next){
      if(!file.isNull() && file.sourceMap) {
        files[file.path] = false;
      }
      this.push(file);
      next();
    }))
    .pipe(removeCss())
    .pipe(writeMap())
    .pipe(through.obj(function (file, enc, next){
      if(!file.isNull() && file.path.match(/\.map$/))  {
        var srcPath = file.path.replace(/\.map$/, '');
        files[srcPath] = true;
      }
      next();
    }))
    .on('error', function (err) {
      cb(err);
    })
    .on('finish', function () {
      for(var key in files) {
        if(!files[key]) {
          return cb(new Error('some source maps are missing'));
        }
      }
      cb();
    });
  });

  it('should output map files with custom extensions', function (cb) {
    var pass = false;
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(loadMap())
      .pipe(writeMap(null, '.custom'))
      .pipe(through.obj(function (file, enc, next){
        if(!file.isNull() && file.path.match(/\.custom$/)) {
          pass = true;
        }
        next();
      }))
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', function () {
        if(pass) {
          cb();
        } else {
          cb(new Error('custom map file not found'));
        }
      });
  });
  it('should accept alternative sourceRoot', function (cb) {
    var found = false;
    gulp.src(path.resolve(__dirname, 'files/css.jsx'), {
      base: __dirname
    })
    .pipe(loadMap())
    .pipe(removeCss())
    .pipe(to5Transform())
      .pipe(writeMap('/test/'))
      .pipe(through.obj(function(file, enc, next){
        if(!file.isNull() && file.path.match(/\.map$/)) {
          try {
            var map = JSON.parse(file.contents.toString(enc));
            expect(map.sourceRoot).to.equal('/test/');
            expect(map.sources.every(function (item) {
              return !/^\/test\//.test(item);
            })).to.equal(true);
              found = true;
            return next();
          } catch(err) {
            return next(err);
          }
        }
        next();
      }))
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', function () {
        if(found) {
          return cb();
        }
        return cb(new Error('source map not found'));
      });
  });
});

