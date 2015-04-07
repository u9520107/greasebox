var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');


var rm = require(path.resolve(__dirname, '../source/rm'));
var _rm = require(path.resolve(__dirname, '../dist/rm'));
var cofs = require(path.resolve(__dirname, '../dist/cofs'));

describe('rm', function() {
  before(function (cb) {
    co(function *() {
      if(!(yield cofs.exists(path.resolve(__dirname, 'tmp')))) {
        yield cofs.mkdir(path.resolve(__dirname, 'tmp'));
      }
      yield cofs.mkdir(path.resolve(__dirname, 'tmp/rm'));
      yield cofs.mkdir(path.resolve(__dirname, 'tmp/rm/nest1'));
      yield cofs.mkdir(path.resolve(__dirname, 'tmp/rm/nest1/nest2'));
      yield cofs.mkdir(path.resolve(__dirname, 'tmp/rm/nest1/nest2/nest3'));
      yield cofs.writeFile(path.resolve(__dirname, 'tmp/rm/file1'), 'test');
      yield cofs.writeFile(path.resolve(__dirname, 'tmp/rm/nest1/file1'), 'test');
      yield cofs.writeFile(path.resolve(__dirname, 'tmp/rm/nest1/file2'), 'test');
      yield cofs.writeFile(path.resolve(__dirname, 'tmp/rm/nest1/nest2/file1'), 'test');
      cb();
    });
  });
  after(function (cb) {
      co(function * () {
        if(yield cofs.exists(path.resolve(__dirname, 'tmp/rm'))) {
          yield _rm(path.resolve(__dirname, 'tmp/rm'));
        }
        cb();
      });
  });
  it('should accept 1 parameter', function () {
    expect(rm.length).to.equal(1);
  });
  it('should remove files', function (cb) {
    co(function * () {
      try {
        yield rm(path.resolve(__dirname, 'tmp/rm/file1'));
        expect(yield cofs.exists(path.resolve(__dirname, 'tmp/rm/file1'))).to.equal(false);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });
  it('should remove empty folder', function (cb) {
    co(function * () {
      try {
        yield rm(path.resolve(__dirname, 'tmp/rm/nest1/nest2/nest3'));
        expect(yield cofs.exists(path.resolve(__dirname, 'tmp/rm/nest1/nest2/nest3'))).to.equal(false);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });
  it('should remove folders recursively', function (cb) {
    co(function * () {
      try {
        yield rm(path.resolve(__dirname, 'tmp/rm/nest1'));
        expect(yield cofs.exists(path.resolve(__dirname, 'tmp/rm/nest1'))).to.equal(false);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });
  it('should not do anything if path does not exist', function (cb) {
    co(function *() {
      try {
        yield rm(path.resolve(__dirname, 'tmp/rm/nofile'));
        cb();
      } catch (err) {
        cb(err);
      }

    });
  });
});
