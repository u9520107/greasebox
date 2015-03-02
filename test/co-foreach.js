import chai from 'chai';
import path from 'path';
import gulp from 'gulp';
import through from 'through2';
import co from 'co';

const expect = chai.expect;
import forEach from '../source/co-foreach';
import sleep from '../dist/sleep';

describe('coForeach', () => {
  it('should be a function', () => {
    expect(forEach).to.be.a('function');
  });

  it('should return a promise', (cb) => {
    let gen = forEach([1, 2, 3]);
    expect(gen).to.exist;
    expect(gen instanceof Promise).to.equal(true);
    gen.then(cb).catch(cb);
  });

  it('should be yieldable', function (cb) {
    co(function * () {
      try {
        yield forEach([], function * () {});
        cb();
      } catch(err) {
        cb(err);
      }
    });
  });

  it('should pass array item and index to the handler', (cb) => {
    let testArr = [0, 1, 2];
    forEach(testArr, function*(no, idx) {
      expect(no).to.equal(idx);
    }).then(cb)
    .catch(cb);
  });

  it('should iterate over the array in order asynchronously', (cb) => {
    co(function * () {
      let testArr = [1, 2, 3];
      var result = [];
      yield forEach(testArr, function * (no, idx) {
        yield sleep(100);
        result.push(no);
      });
      expect(result).to.deep.equal(testArr);
    }).then(cb)
    .catch(cb);
  });

  it('should accept non generator functions if they return promises', (cb) => {
    co(function * () {
      yield forEach([0, 1, 2], function(no, idx) {
        return Promise.resolve();
      });
    }).then(cb)
    .catch(cb);
  });

  it('should reject if generator function handler throws', (cb) => {
    forEach([0, 1, 2], function * (no, idx){
      throw('test');
    }).then(() => {
      cb(new Error('error was not captured'));
    }).catch((err)=> {
      try {
        expect(err).to.equal('test');
        cb();
      } catch(ferr) {
        cb(ferr);
      }
    });
  });

  it('should reject if non generator function handler rejects', (cb) => {
    forEach([0, 1, 2], () => {
      return Promise.reject('test');
    }).then(() => {
      cb(new Error('error was not captured'));
    }).catch((err) => {
      try{
        expect(err).to.equal('test');
        cb();
      } catch (ferr) {
        cb(ferr);
      }
    });
  });
});

