"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var through = _interopRequire(require("through2"));

var path = _interopRequire(require("path"));

var gutil = _interopRequire(require("gulp-util"));

var chalk = _interopRequire(require("chalk"));

var hasSourceMappingUrl = /^\/\/# sourceMappingURL=/;

function writeMap(root, ext) {
  if (!ext) {
    ext = ".map";
  }
  return through.obj(function (file, enc, next) {
    if (file.isNull()) {
      return next();
    } else if (file.sourceMap) {
      var sourceRoot = root ? root : file.sourceMap.sourceRoot;
      //replace
      if (sourceRoot !== file.sourceMap.sourceRoot) {
        var nameCheck = new RegExp("^" + escapeRegExp(sourceRoot));
        file.sourceMap.sources = file.sourceMap.sources.map(function (name) {
          /**
           *  Else cases happens when transformation had gone through file name changes.
           *  e.g. .jsx => .js
           *  Or when transforms have included compiled code from other sources
           *  eg. traceur's @tranceur runtime files
           *
           *  Marks to be difficult to test after using 6to5 instead of traceur.
           */
          /* istanbul ignore else */
          if (name[0] !== "/" && name[0] !== "@") {
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

      // add sourceMappingURL if not found in source
      var src = file.contents.toString(enc);
      if (!hasSourceMappingUrl.test(src)) {
        src += "\n\n//# sourceMappingURL=./" + path.basename(mapFile.path);
        file.contents = new Buffer(src);
      }

      this.push(file);
      this.push(mapFile);
    } else {
      this.push(file);
    }
    next();
  });
}
/**
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
function escapeRegExp(string) {
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}
module.exports = writeMap;