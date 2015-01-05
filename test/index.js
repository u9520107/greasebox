var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');

var traceur = require('traceur');
require(traceur.RUNTIME_PATH);


var greasebox = require(path.resolve(__dirname, '../source/index'));
var cofs = require(path.resolve(__dirname, '../dist/cofs')).default;

describe('greasebox', function() {
  it('should contain all the modules', function(cb) {
    co(function*() {
      var modules =
        yield cofs.readdir(path.resolve(__dirname, '../source'));
      for (var i = 0; i < modules.length; i++) {
        if (modules[i].match(/\.js$/) && modules[i] !== 'index.js') {
          var name = modules[i].split('.')[0];
          name = name.split('-');
          for (j = 1; j < name.length; j++) {
            name[j] = name[j][0].toUpperCase() + name[j].substring(1);
          }
          name = name.join('');
          if(!greasebox[name]) {
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
