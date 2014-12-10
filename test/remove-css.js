var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var removeCss = require(path.resolve(__dirname, '../source/node/remove-css')).default;
var loadMap = require(path.resolve(__dirname, '../dist/node/load-map')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

describe('removeCss', function() {
  it('should be a function', function() {
    expect(removeCss).to.be.a('function');
  });

  it('should return an writable object', function() {
    obj = removeCss();
    expect(obj).to.be.a('object');
    expect(obj.writable).to.equal(true);
  });

  it('should remove css imports', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/css.jsx'))
      .pipe(removeCss())
      .pipe(through.obj(function (file, enc, next) {
        var transformed = file.contents.toString(enc);
        try {
          expect(/\.css!/.test(transformed)).to.equal(false);
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

  it('should make no changes if no css import is found', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(removeCss())
      .pipe(through.obj(function (file, enc, next) {
        var transformed = file.contents.toString(enc);
        co(function * () {
          var expected = yield cofs.readFile(path.resolve(__dirname, 'files/b.jsx'), 'utf8');
          try {
            expect(transformed).to.equal(expected);
            next();
          } catch(err) {
            next(err);
          }
        });
      }))
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', cb);
  });

  it('should make no changes if file is not *.js or *.jsx', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/test.txt'))
      .pipe(removeCss())
      .pipe(through.obj(function (file, enc, next) {
        var transformed = file.contents.toString(enc);
        co(function * () {
          var expected = yield cofs.readFile(path.resolve(__dirname, 'files/test.txt'), 'utf8');
          try {
            expect(transformed).to.equal(expected);
            next();
          } catch(err) {
            next(err);
          }
        });
      }))
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', cb);
  });

  it('should throw error when failed to parse file', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/c.jsx'))
      .pipe(removeCss())
      .on('error', function (err) {
        try {
          expect(err).to.exist();
          cb();
        } catch(e) {
          cb(e);
        }
      })
      .on('finish', function () {
        cb(new Error('no error thrown'));
      });
  });
  
  // only test the existance of source map but not the validity
  it('should make changes to the sourceMap property', function (cb) {
    var original;
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(loadMap())
      .pipe(through.obj(function (file, enc, next){
        original = JSON.stringify(file.sourceMap);
        this.push(file);
        next();
      }))
      .pipe(removeCss())
      .pipe(through.obj(function (file, enc, next) {
        var transformed = JSON.stringify(file.sourceMap);
        try {
          expect(original === transformed).to.equal(false);
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

  it('should work with glob', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
      .pipe(removeCss())
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', cb);
  });

});
