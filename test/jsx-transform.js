var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var jsxTransform = require(path.resolve(__dirname, '../source/jsx-transform')).default;
var loadMap = require(path.resolve(__dirname, '../dist/load-map')).default;
var writeMap = require(path.resolve(__dirname, '../dist/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/rm')).default;
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;
var _jsxTransform = require(path.resolve(__dirname, '../dist/jsx-transform')).default;

describe('jsxTransform', function() {
  afterEach(function (cb) {
    co(function *(){
      if(yield cofs.exists(path.resolve(__dirname, 'tmp/jsx-transform'))) {
        try {
         yield rm(path.resolve(__dirname, 'tmp/jsx-transform'));
        } catch(err) {
          console.log(err);
        }
      }
      cb();
    });
  });
  var obj;


  it('should be a function', function() {
    expect(jsxTransform).to.be.a('function');
  });

  it('should return an writable object', function() {
    obj = jsxTransform();
    expect(obj).to.be.a('object');
    expect(obj.writable).to.equal(true);
  });

  it('should process jsx files into js files', function(cb) {
      var transformed;
      var expected;
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(jsxTransform())
      .pipe(through.obj(function (file, enc, next) {
            transformed = file.contents.toString(enc);
            next();
      }))
      .on('finish', function () {
        if(transformed) {
            gulp.src(path.resolve(__dirname, 'files/b.jsx'))
                .pipe(_jsxTransform())
                .pipe(through.obj(function (file, enc, next) {
                    expected = file.contents.toString(enc);
                    next();
                }))
                .on('finish', function () {
                    try {
                        expect(transformed).to.equal(expected);
                        cb();
                    } catch(err) {
                        cb(err);
                    }
                });

        } else {
            cb(new Error('file not transformed'));
        }

      });
  });

  it('should make changes to the sourceMap property', function (cb) {
    var original;
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(loadMap())
      .pipe(through.obj(function (file, enc, next){
        original = JSON.stringify(file.sourceMap);
        this.push(file);
        next();
      }))
      .pipe(jsxTransform())
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

  it('should pass *.js files as original', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(jsxTransform())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform')))
      .on('end', function() {
        co(function*() {
          try {
            expect(yield cofs.exists(path.resolve(__dirname, 'tmp/jsx-transform/a.js'))).to.equal(true);
            var transformed = yield cofs.readFile(path.resolve(__dirname, 'tmp/jsx-transform/a.js'), 'utf8');
            var expected = yield cofs.readFile(path.resolve(__dirname, 'files/a.js'), 'utf8');
            expect(transformed).to.equal(expected);
            cb();
          } catch (err) {
            cb(err);
          }
        });
      });
  });

  it('should pass other files as original', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/test.txt'))
      .pipe(jsxTransform())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform')))
      .on('end', function() {
        co(function*() {
          try {
            expect(yield cofs.exists(path.resolve(__dirname, 'tmp/jsx-transform/test.txt'))).to.equal(true);

            var transformed = yield cofs.readFile(path.resolve(__dirname, 'tmp/jsx-transform/test.txt'), 'utf8');
            var expected = yield cofs.readFile(path.resolve(__dirname, 'files/test.txt'), 'utf8');
            expect(transformed).to.equal(expected);
            cb();
          } catch (err) {
            cb(err);
          }
        });
      });
  });

  it('should throw error when parse fails', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/c.jsx'))
      .pipe(jsxTransform())
      .on('error', function (err) {
        expect(err).to.exist();
        cb();
      })
      .on('end', function () {
        cb(new Error('error not thrown'));
      });
  });

  it('should work with globs', function (cb) {
      gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
      .pipe(jsxTransform())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform/glob')))
      .on('end', function () {
          gulp.src(path.resolve(__dirname, 'files/glob/**/*'))
          .pipe(_jsxTransform())
          .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform/glob-expected')))
          .on('end', function () {
              co(function * () {
                  try {
                      var globPath = path.resolve(__dirname, 'tmp/jsx-transform/glob');
                      expect(yield cofs.exists(path.resolve(globPath, 'd.js'))).to.equal(true);
                      expect(yield cofs.exists(path.resolve(globPath, 'nest/e.js'))).to.equal(true);

                      var expected = yield cofs.readFile(path.resolve(__dirname, 'tmp/jsx-transform/glob-expected/d.js'), 'utf8');
                      expect(yield cofs.readFile(path.resolve(globPath, 'd.js'), 'utf8')).to.equal(expected);
                      expect(yield cofs.readFile(path.resolve(globPath, 'nest/e.js'), 'utf8')).to.equal(expected);

                      cb();
                  } catch(err) {
                      cb(err);
                  }

              });

          });

      });
  });

});
