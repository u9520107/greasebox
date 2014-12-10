var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var writeMap = require(path.resolve(__dirname, '../source/node/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;
var loadMap = require(path.resolve(__dirname, '../dist/node/load-map')).default;

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
});

