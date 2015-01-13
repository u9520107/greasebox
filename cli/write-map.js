"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__path__,
    $__gulp_45_util__,
    $__chalk__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var gutil = ($__gulp_45_util__ = require("gulp-util"), $__gulp_45_util__ && $__gulp_45_util__.__esModule && $__gulp_45_util__ || {default: $__gulp_45_util__}).default;
var chalk = ($__chalk__ = require("chalk"), $__chalk__ && $__chalk__.__esModule && $__chalk__ || {default: $__chalk__}).default;
function writeMap(root, ext) {
  if (!ext) {
    ext = '.map';
  }
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      return next();
    } else if (file.sourceMap) {
      var sourceRoot = root ? root : file.sourceMap.sourceRoot;
      if (sourceRoot !== file.sourceMap.sourceRoot) {
        var nameCheck = new RegExp('^' + escapeRegExp(sourceRoot));
        file.sourceMap.sources = file.sourceMap.sources.map(function(name) {
          if (name[0] !== '/' && name[0] !== '@') {
            return file.sourceMap.sourceRoot + name;
          } else if (name.match(nameCheck)) {
            return name.substring(sourceRoot.length);
          } else {
            return name;
          }
        });
        file.sourceMap.sourceRoot = sourceRoot;
      }
      var mapFile = new gutil.File({
        base: file.base,
        cwd: file.cwd,
        path: file.path + ext,
        contents: new Buffer(JSON.stringify(file.sourceMap))
      });
      this.push(file);
      this.push(mapFile);
    } else {
      console.log(("[" + chalk.cyan('writeMap') + "] Failed to write sourcemap for " + chalk.red(file.path)));
      this.push(file);
    }
    next();
  });
}
function escapeRegExp(string) {
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
}
var $__default = writeMap;
//# sourceURL=write-map.js