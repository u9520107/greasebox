var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var es5Transform = require(path.resolve(__dirname, '../source/node/es5-transform')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;
//
//describe('es5Transform', function() {
//  console.log('es5Transform: ', es5Transform); 
//});

