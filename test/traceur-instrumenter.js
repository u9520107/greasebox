var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var traceur = require('traceur');
require(traceur.RUNTIME_PATH);
var tracuerInstrumenter = require(path.resolve(__dirname, '../source/node/traceur-instrumenter')).default;

describe('traceurInstrumenter', function () {
  // how to test?
});
