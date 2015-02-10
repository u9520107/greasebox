"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var through = _to5Helpers.interopRequire(require("through2"));

var applyMap = _to5Helpers.interopRequire(require("vinyl-sourcemaps-apply"));

var debug = _to5Helpers.interopRequire(require("debug"));

var chalk = _to5Helpers.interopRequire(require("chalk"));

var to5 = _to5Helpers.interopRequire(require("6to5"));

var log = debug("to5Transform");

function to5Transform() {
  var opts = arguments[0] === undefined ? {} : arguments[0];
  return through.obj(function (file, enc, cb) {
    try {
      if (file.isNull()) {
        return cb();
      } else if (file.path.match(/\.(js|jsx)$/i)) {
        var useSourceMap = !!file.sourceMap;
        opts.sourceMap = useSourceMap;

        opts.filename = file.path;
        opts.filenameRelative = file.relative;

        var src = file.contents.toString(enc);
        var output = to5.transform(file.contents.toString(enc), opts);
        if (useSourceMap && output.map) {
          output.map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, output.map);
          file.buildStep = "@6to5/";
        }
        file.contents = new Buffer(output.code);
        if (file.path.match(/\.jsx$/i)) {
          file.path = file.path.replace(/\.jsx$/i, ".js");
        }
        this.push(file);
      } else {
        this.push(file);
      }
      cb();
    } catch (err) {
      console.log("[" + chalk.cyan("to5Transform") + "] Failed to transform " + chalk.red(file.path));
      log(err);
      cb(err);
    }
  });
}
module.exports = to5Transform;

//# sourceMappingURL=./to5-transform.js.map