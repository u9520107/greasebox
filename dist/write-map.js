"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__co_45_fs__,
    $__co__,
    $__path__,
    $__gulp_45_util__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var cofs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__}).default;
var co = ($__co__ = require("co"), $__co__ && $__co__.__esModule && $__co__ || {default: $__co__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var gutil = ($__gulp_45_util__ = require("gulp-util"), $__gulp_45_util__ && $__gulp_45_util__.__esModule && $__gulp_45_util__ || {default: $__gulp_45_util__}).default;
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
      this.push(file);
    }
    next();
  });
}
function escapeRegExp(string) {
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}
var $__default = writeMap;

//# sourceMappingURL=write-map.js.map
//# sourceURL=write-map.js