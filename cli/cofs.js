"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__thunkify__,
    $__fs__,
    $__co_45_stream__;
var thunkify = ($__thunkify__ = require("thunkify"), $__thunkify__ && $__thunkify__.__esModule && $__thunkify__ || {default: $__thunkify__}).default;
var fs = ($__fs__ = require("fs"), $__fs__ && $__fs__.__esModule && $__fs__ || {default: $__fs__}).default;
var coStream = ($__co_45_stream__ = require("./co-stream"), $__co_45_stream__ && $__co_45_stream__.__esModule && $__co_45_stream__ || {default: $__co_45_stream__}).default;
var methods = ['rename', 'ftruncate', 'chown', 'fchown', 'lchown', 'chmod', 'fchmod', 'stat', 'lstat', 'fstat', 'link', 'symlink', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'close', 'open', 'utimes', 'futimes', 'fsync', 'write', 'read', 'readFile', 'writeFile', 'appendFile'];
var cofs = {};
methods.forEach(function(name) {
  if (fs[name]) {
    cofs[name] = thunkify(fs[name]);
  }
});
cofs.exists = function(path) {
  return function(done) {
    fs.stat(path, function(err, res) {
      done(null, !err);
    });
  };
};
cofs.createReadStream = function() {
  return coStream(fs.createReadStream.apply(null, arguments));
};
var $__default = cofs;
//# sourceURL=cofs.js