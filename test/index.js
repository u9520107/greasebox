var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');

var greasebox = require(path.resolve(__dirname, '../source/index'));
var cofs = require(path.resolve(__dirname, '../dist/cofs'));

describe('greasebox', function() {
  it('should contain all the modules', function(cb) {

    var exclusions = [].map(function (name) {
      return computeName(name);
    });

    co(function*() {
      var modules =
        yield cofs.readdir(path.resolve(__dirname, '../source'));
      for (var i = 0; i < modules.length; i++) {
        if (modules[i].match(/\.js$/) && modules[i] !== 'index.js') {
          var name = computeName(modules[i]);
          if(exclusions.indexOf(name) === -1 && !greasebox[name]) {
            throw Error('module ' + name + ' is not found');
          }
        }
      }
    }).then(function () {
      cb();
    }).catch(function (err) {
      cb(err);
    });
  });

});
function computeName(name) {
  name = name.split('.')[0].split('-');
  for (j = 1; j < name.length; j++) {
    name[j] = name[j][0].toUpperCase() + name[j].substring(1);
  }
  return name.join('');
}
