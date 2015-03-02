var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');



var coMap = require(path.resolve(__dirname, '../source/co-map'));

describe('coMap', function() {

  it('should be a function', function () {
    expect(coMap).to.be.a('function');
  });

  //it('should be a generator function', function () {
  //  var gen = coMap();
  //  expect(gen).to.exist;
  //  expect(gen.next).to.be.a('function');
  //});

  it('should be yieldable', function (cb) {
    co(function * () {
      try {
        yield coMap([], function * () {});
        cb();
      } catch(err) {
        cb(err);
      }
    });
  });

  it('should pass array item and index to the handler', function (cb) {
    co(function * () {
      var testArr = [0, 1, 2];
      yield coMap(testArr, function *(no, idx) {
        expect(no).to.equal(idx);
      });
      cb();

    }).catch(function (err) {
      cb(err);
    });
  });

  it('should iterate over the array in order', function (cb) {
    co(function * () {
        var testArr = [1, 2, 3];
        var result = [];
        yield coMap(testArr, function *(no, idx) {
          yield new Promise(function (resolve) {
            setTimeout(resolve, 100);
          });
          result.push(no);
        });
        expect(result).to.deep.equal(testArr);
        cb();
    }).catch(function (err) {
      cb(err);
    });
  });

  it('should return an array', function (cb) {
    co(function * () {
      var testArr = [0, 1, 2];
      var result = yield coMap(testArr, function *(no){
        return no;
      });
      expect(result).to.be.a('array');
      expect(result).to.deep.equal(testArr);
      cb();
    }).catch(function (err) {
      cb(err);
    });
  });

  it('should retrn an array of returned values', function (cb) {
    co(function * () {
      var testArr = [0,1,2];
      var expected = testArr.map(function (item) {
        return item * 2;
      });
      var result = yield coMap(testArr, function * (item) {
        return item * 2;
      });
      expect(result).to.deep.equal(expected);
      cb();
    }).catch(function (err) {
      cb(err);
    });
  });

  it('should return a promise when not used in generator context', function (cb) {
    var testArr = [0, 1, 2];
    coMap(testArr, function *(no) {
      return no;
    }).then(function (result) {
      expect(result).to.deep.equal(testArr);
      cb();
    }).catch(cb);
  });

  it('should work with functions that returns a promise', function (cb) {
    co(function * () {
      var testArr = [1,2,3];
      var result = yield coMap(testArr, function (no){
        return Promise.resolve(no);
      });
      expect(result).to.deep.equal(testArr);
      cb();
    }).catch(cb);
  });
});
