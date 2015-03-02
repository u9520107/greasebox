var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var recast = require('recast');


var babelTransform = require(path.resolve(__dirname, '../source/babel-transform'));
var _babelTransform = require(path.resolve(__dirname, '../dist/babel-transform'));
var rm = require(path.resolve(__dirname, '../dist/rm'));
var loadMap = require(path.resolve(__dirname, '../dist/load-map'));
var cofs = require(path.resolve(__dirname, '../dist/cofs'));
var removeCss = require(path.resolve(__dirname, '../dist/remove-css'));

describe('babelTransform', function() {
  afterEach(function(cb) {
    co(function*() {
      yield rm(path.resolve(__dirname, 'tmp/traceur-transform'));
      cb();
    });
  });


  it('should be a function', function() {
    expect(babelTransform).to.be.a('function');
  });

  it('should return a writable object', function() {
    var obj = babelTransform();
    expect(obj).to.exist;
    expect(obj.writable).to.equal(true);
  });

  it('should skip non-js files', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/error.styl'))
      .pipe(babelTransform())
      .pipe(through.obj(function(file, enc, next) {
        var transformed = file.contents.toString(enc);
        co(function*() {
          try {
            expect(transformed).to.equal(
              yield cofs.readFile(path.resolve(__dirname, 'files/error.styl'), 'utf8'));
            next();
          } catch (err) {
            next(err);
          }
        });
      }))
      .on('error', function(err) {
        cb(err);
      })
      .on('finish', cb);
  });

  it('should transform es6 files to node compliant modules by default', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(babelTransform())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/traceur-transform')))
      .on('finish', function() {
        co(function * () {
          var testMod = require(path.resolve(__dirname, 'tmp/traceur-transform/a.js'));
          try {
            expect(testMod).to.exist;
            expect(testMod).to.exist;
            expect(testMod).to.be.a('function');
            var obj = testMod();
            expect(obj).to.exist;
            expect(obj.next).to.exist;
            //obj should be a generator test passes
            cb();
          } catch (err) {
            cb(err);
          }
        });
      });
  });


  it('should throw error when failed to parse js', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/error.js'))
      .pipe(babelTransform())
      .on('error', function(err) {
        try {
          expect(err).to.exist;
          cb();
        } catch(e) {
          cb(e);
        }
      })
      .on('finish', function () {
        cb(new Error('error not thrown'));
      });

  });

  it('should accept compile options', function (cb) {
    var result;
    var expected;
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(babelTransform({
        blacklist: ['regenerator']
      }))
      .pipe(through.obj(function (file, enc, next) {
          result = file.contents.toString(enc);
          next();
      })).on('finish', function() {
        gulp.src(path.resolve(__dirname, 'files/a.js'))
        .pipe(_babelTransform({
          blacklist: ['regenerator']
        }))
        .pipe(through.obj(function (file, enc, next) {
          expected = file.contents.toString(enc);
          next();
        })).on('finish', function() {
          try {
            expect(result).to.exist;
            expect(expected).to.exist;
            expect(result).to.equal(expected);
            cb();
          } catch(err) {
            cb(err);
          }
        });

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
    .pipe(babelTransform())
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
      .pipe(babelTransform())
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', cb);
  });

  it('should chain up sourceMaps', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/css.jsx'))
      .pipe(loadMap())
      .pipe(removeCss())
      .pipe(babelTransform())
      .on('finish', cb);
  });
});
