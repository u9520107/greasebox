var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var jsxTransform = require(path.resolve(__dirname, '../source/node/jsx-transform'));
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

describe('jsxTransform', function() {
  it('should be a module', function() {
    expect(jsxTransform);
  });
  it('should have property default', function() {
    expect(jsxTransform.default);
  });
});

describe('jsxTransform.default', function() {
  after(function (cb) {
    co(function *(){
      if(yield cofs.exists(path.resolve(__dirname, 'tmp/jsx-transform'))) {
        yield rm(path.resolve(__dirname, 'tmp/jsx-transform'));
      }
      cb();
    });
  });
  var obj;
  it('should be a function', function() {
    expect(jsxTransform.default).to.be.a('function');
  });
  it('should return an stream-reader', function() {
    obj = jsxTransform.default();
    expect(obj).to.be.a('object');
    expect(obj.writable);
  });
  it('should process jsx files into js files', function(cb) {
    gulp.src(path.resolve(__dirname, 'files/b.jsx'))
      .pipe(jsxTransform.default())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform')))
      .on('end', function() {
        co(function*() {
          try {
            var transformed = yield cofs.readFile(path.resolve(__dirname, 'tmp/jsx-transform/b.js'), 'utf8');
            var expected = yield cofs.readFile(path.resolve(__dirname, 'files/b.js'), 'utf8');
            expect(transformed).to.equal(expected);
            cb();
          } catch (err) {
            cb(err);
          }
        });
      });
  });
  it('should pass js files as original', function (cb) {
    gulp.src(path.resolve(__dirname, 'files/a.js'))
      .pipe(jsxTransform.default())
      .pipe(gulp.dest(path.resolve(__dirname, 'tmp/jsx-transform')))
      .on('end', function() {
        co(function*() {
          try {
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
});
