var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var recast = require('recast');


var traceur = require('traceur');
require(traceur.RUNTIME_PATH);
var traceurTransform = require(path.resolve(__dirname, '../source/traceur-transform')).default;
var jsxTransform = require(path.resolve(__dirname, '../dist/jsx-transform')).default;
var rm = require(path.resolve(__dirname, '../dist/rm')).default;
var loadMap = require(path.resolve(__dirname, '../dist/load-map')).default;
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;

describe('traceurTransform', function() {
  afterEach(function(cb) {
    co(function*() {
      yield rm(path.resolve(__dirname, 'tmp/traceur-transform'));
      cb();
    });
  });


  it('should be a function', function() {
    expect(traceurTransform).to.be.a('function');
  });

  it('should return a writable object', function() {
    var obj = traceurTransform();
    expect(obj).to.exist();
    expect(obj.writable).to.equal(true);
  });

  it('should skip non-js files', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(traceurTransform())
      .pipe(through.obj(function(file, enc, next) {
        var transformed = file.contents.toString(enc);
        co(function*() {
          try {
            expect(transformed).to.equal(
              yield cofs.readFile(path.resolve(__dirname, 'files/b.jsx'), 'utf8'));
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
      .pipe(traceurTransform())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/traceur-transform')))
      .on('finish', function() {
        var testMod = require(path.resolve(__dirname, 'tmp/traceur-transform/a.js'));
        try {
          expect(testMod).to.exist();
          expect(testMod.default).to.exist();
          expect(testMod.default).to.be.a('function');
          var obj = testMod.default();
          expect(obj).to.exist();
          expect(obj.next).to.exist();
          //obj should be a generator test passes
          cb();
        } catch (err) {
          cb(err);
        }
      });
  });

  it('should accpet traceur options', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(traceurTransform({
        modules: 'instantiate',
        generators: 'parse'
      }))
      .pipe(through.obj(function(file, enc, next) {
        var transformed = file.contents.toString(enc);
        co(function*() {
          try {
            var ast = recast.parse(transformed);
            expect(ast.program.body[0].expression.arguments[1].body.body[1].generator).to.equal(true);
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

  it('should throw error when failed to parse js', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/error.js'))
      .pipe(traceurTransform())
      .on('error', function(err) {
        try {
          expect(err).to.exist();
          cb();
        } catch(e) {
          cb(e);
        }
      })
      .on('finish', function () {
        cb(new Error('error not thrown'));
      });

  });

  it('should make changes to the sourceMap property', function (cb) {
    var original;
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(loadMap())
      .pipe(through.obj(function (file, enc, next){
        original = JSON.stringify(file.sourceMap);
        this.push(file);
        next();
      }))
      .pipe(traceurTransform())
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
      .pipe(traceurTransform())
      .on('error', function (err) {
        cb(err);
      })
      .on('finish', cb);
  });

});
