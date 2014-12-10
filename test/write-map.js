var expect = require('chai').expect;
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var co = require('co');
var cofs = require('co-fs');


var writeMap = require(path.resolve(__dirname, '../source/node/write-map')).default;
var rm = require(path.resolve(__dirname, '../dist/node/rm')).default;

describe('writeMap', function() {
});

