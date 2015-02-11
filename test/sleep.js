import chai from 'chai';
import path from 'path';
import gulp from 'gulp';
import through from 'through2';
import co from 'co';

const expect = chai.expect;

import sleep from '../source/sleep';

describe('sleep', () => {
  it('is a function', () => {
    expect(sleep).to.be.a('function');
  });

  it('should return a promise', () => {
    let p = sleep();
    expect(p instanceof Promise).to.equal(true);
  });

  it('should resolve after specified time', (cb) => {
    co(function * (){
      let t = 100;
      let start = new Date().getTime();
      yield sleep(t);
      let end = new Date().getTime();
      expect( end-start  < t).to.equal(false);
    }).then(cb)
      .catch(cb);
  });

  it('should resolve if t is 0 or not a number', (cb) => {
    co(function * () {
      yield sleep(0);
      yield sleep('error');
    }).then(cb)
      .catch(cb);
  });
});
