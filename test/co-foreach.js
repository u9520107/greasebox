var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var coForeach = require(path.resolve(__dirname, '../source/co-foreach')).default;

describe('coForeach', function() {
  it('should be a function', function () {
    expect(coForeach).to.be.a('function');
  });
});
