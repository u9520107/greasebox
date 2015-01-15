var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');



var coForeach = require(path.resolve(__dirname, '../source/co-foreach'));

describe('coForeach', function() {

  it('should be a function', function () {
    expect(coForeach).to.be.a('function');
  });

  it('should be a generator function', function () {
    var gen = coForeach();
    expect(gen).to.exist();
    expect(gen.next).to.be.a('function');
  });

  it('should be yieldable', function (cb) {
    co(function * () {
      try {
        yield coForeach([], function * () {});
        cb();
      } catch(err) {
        cb(err);
      }
    });
  });

  it('should pass array item and index to the handler', function (cb) {
    co(function * () {
      var testArr = [0, 1, 2];
      yield coForeach(testArr, function *(no, idx) {
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
        yield coForeach(testArr, function *(no, idx) {
          //yield new Promise(function (resolve) {
          //  setTimeout(resolve, 100);
          //});
          yield sleep(100);
          result.push(no);
        });
        expect(result).to.deep.equal(testArr);
        cb();
    }).catch(function (err) {
      cb(err);
    });
  });




});


//function sleep(t) {
//  return new Promise(function (resolve) {
//    setTimeout(resolve, t);
//  });
//}
function sleep(t) {
  return function (cb) {
    setTimeout(cb, t);
  };
}
