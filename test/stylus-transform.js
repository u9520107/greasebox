var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);

var stylusTransform = require(path.resolve(__dirname, '../source/node/stylus-transform')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

describe('stylusTransform', function() {
  it('should be a function', function () {
    expect(stylusTransform).to.be.a('function');
  });

  it('should be a writable object', function () {
    var obj = stylusTransform();
    expect(obj).to.exist();
    expect(obj.writable).to.equal(true);
  });

});

