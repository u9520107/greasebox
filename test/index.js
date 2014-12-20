var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var greasebox = require(path.resolve(__dirname, '../source/index'));
var jsxTransform = require(path.resolve(__dirname, '../source/jsx-transform')).default;
var loadMap = require(path.resolve(__dirname, '../source/load-map')).default;
var removeCss = require(path.resolve(__dirname, '../source/remove-css')).default;
var rm = require(path.resolve(__dirname, '../source/rm')).default;
var traceurInstrumenter = require(path.resolve(__dirname, '../source/traceur-instrumenter')).default;
var traceurTransform = require(path.resolve(__dirname, '../source/traceur-transform')).default;
var writeMap = require(path.resolve(__dirname, '../source/write-map')).default;

describe('greasebox', function () {
  it('should contain all the modules', function () {
    expect(greasebox).to.exist();
    expect(greasebox.jsxTransform).to.equal(jsxTransform);
    expect(greasebox.loadMap).to.equal(loadMap);
    expect(greasebox.removeCss).to.equal(removeCss);
    expect(greasebox.rm).to.equal(rm);
    expect(greasebox.traceurInstrumenter).to.equal(traceurInstrumenter);
    expect(greasebox.traceurTransform).to.equal(traceurTransform);
    expect(greasebox.writeMap).to.equal(writeMap);
  });

});
