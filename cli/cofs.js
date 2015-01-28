"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var thunkify = _interopRequire(require("thunkify"));

var fs = _interopRequire(require("fs"));

var coStream = _interopRequire(require("./co-stream"));

/**
 *  cofs module derives from tj/co-fs.
 */
var methods = ["rename", "ftruncate", "chown", "fchown", "lchown", "chmod", "fchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile"];
var cofs = {};
methods.forEach(function (name) {
  /* istanbul ignore else */
  if (fs[name]) {
    cofs[name] = thunkify(fs[name]);
  }
});
cofs.exists = function (path) {
  return function (done) {
    fs.stat(path, function (err, res) {
      done(null, !err);
    });
  };
};
cofs.createReadStream = function () {
  return coStream(fs.createReadStream.apply(null, arguments));
};
module.exports = cofs;