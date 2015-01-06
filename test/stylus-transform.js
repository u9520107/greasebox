var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var stylusTransform = require(path.resolve(__dirname, '../source/stylus-transform')).default;
var rm = require(path.resolve(__dirname, '../dist/rm')).default;
var loadMap = require(path.resolve(__dirname, '../dist/load-map')).default;
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;
var _stylusTransform = require(path.resolve(__dirname, '../dist/stylus-transform')).default;

describe('stylusTransform', function() {
  it('should be a function', function () {
    expect(stylusTransform).to.be.a('function');
  });

  it('should be a writable object', function () {
    var obj = stylusTransform();
    expect(obj).to.exist();
    expect(obj.writable).to.equal(true);
  });

  it('should compile stylus into css', function (cb) {
      var expected, transformed;
    gulp.src(path.resolve(__dirname, 'files/style.styl'))
      .pipe(stylusTransform())
      .pipe(through.obj(function (file, enc, next){
          transformed = file.contents.toString(enc);
          next();
      }))
      .on('finish', function () {
          gulp.src(path.resolve(__dirname, 'files/style.styl'))
          .pipe(_stylusTransform())
          .pipe(through.obj(function (file, enc, next) {
            expected = file.contents.toString(enc);
            next();
          }))
          .on('finish', function () {
                try {
                    expect(transformed).to.equal(expected);
                    cb();
                } catch (err) {
                    cb(err);
                }
          })
          .on('error', function (err) {
            cb(err);
          });
      })
      .on('error', function (err) {
        cb(err);
      });
  });

  it('should skip non stylus files', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/style.css'))
      .pipe(stylusTransform())
      .pipe(through.obj(function (file, enc, next){
        co(function * () {
          var transformed = file.contents.toString(enc);
          var expected = yield cofs.readFile(path.resolve(__dirname, 'files/style.css'), 'utf8');
          try {
            expect(transformed).to.equal(expected);
            next();
          } catch (err) {
            next(err);
          }
        });
      }))
      .on('finish', function () {
        cb();
      })
      .on('error', function (err) {
        cb(err);
      });

  });

  it('should work with globs', function (cb) {
      var pass = false, expected;
      gulp.src(path.resolve(__dirname, 'files/style.styl'))
      .pipe(_stylusTransform())
      .pipe(through.obj(function (file, enc, next) {
          expected = file.contents.toString(enc);
          next();
      }))
      .on('finish', function () {
          gulp.src(path.resolve(__dirname, 'files/glob/**'))
          .pipe(stylusTransform())
          .pipe(through.obj(function (file, enc, next){
              if(file.path.match(/\.css$/)) {
                  co(function * () {
                      var transformed = file.contents.toString(enc);
                      try {
                          expect(transformed).to.equal(expected);
                          pass = true;
                          next();
                      } catch (err) {
                          next(err);
                      }
                  });
              } else {
                  next();
              }

          }))
          .on('finish', function () {
              if(!pass) {
                  return cb(new Error('compiled file not found'));
              }
              cb();
          })
          .on('error', function (err) {
              cb(err);
          });

      })
      .on('error', function (err) {
          cb(err);
      });

  });

  it('should catch errors', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/error.styl'))
      .pipe(stylusTransform())
      .on('finish', function () {
        cb(new Error('no error captured'));
      })
      .on('error', function (err) {
        try {
          expect(err).to.exist();
          cb();
        } catch(e) {
          cb(e);
        }
      });

  });

  it('should generate sourcemaps', function (cb) {
    var pass = false;
    var original;
    gulp.src(path.resolve(__dirname, 'files/style.styl'))
    .pipe(loadMap())
      .pipe(through.obj(function (file, enc, next){
        original = JSON.stringify(file.sourceMap);
        this.push(file);
        next();
      }))
      .pipe(stylusTransform())
      .pipe(through.obj(function (file, enc, next){
        var transformed = JSON.stringify(file.sourceMap);
        try {
          expect(transformed).to.not.equal(original);
          next();
        } catch(err) {
          next(err);
        }
      }))
      .on('finish', function () {
        cb();
      })
      .on('error', function (err) {
        cb(err);
      });


  });

});

