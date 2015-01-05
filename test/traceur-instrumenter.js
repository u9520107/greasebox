var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');


var traceur = require('traceur');
require(traceur.RUNTIME_PATH);
var traceurInstrumenter = require(path.resolve(__dirname, '../source/traceur-instrumenter')).default;
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;

describe('traceurInstrumenter', function () {
  // how to test?
});
