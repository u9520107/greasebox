"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var through = _to5Helpers.interopRequire(require("through2"));

var Renderer = _to5Helpers.interopRequire(require("stylus/lib/renderer"));

var applyMap = _to5Helpers.interopRequire(require("vinyl-sourcemaps-apply"));

var path = _to5Helpers.interopRequire(require("path"));

var chalk = _to5Helpers.interopRequire(require("chalk"));

var debug = _to5Helpers.interopRequire(require("debug"));

var log = debug("stylusTransform");
/**
 * @function
 *
 */
function stylusTransform() {
  return through.obj(function (file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.styl$/)) {
        var src = file.contents.toString(enc);
        var useSourceMaps = !!file.sourceMap;
        var opts = { filename: path.basename(file.path) };
        if (useSourceMaps) {
          opts.sourcemap = "comment";
        }
        var renderer = new Renderer(src, opts);
        var output = renderer.render();
        file.contents = new Buffer(output);
        if (file.sourceMap && renderer.sourcemap) {
          var map = renderer.sourcemap;
          map.sourcesContent = [src];
          map.sourceRoot = file.buildStep;
          applyMap(file, map);
          file.buildStep = "@stylus/";
        }
        file.path = file.path.replace(/\.styl$/, ".css");
        this.push(file);
      } else {
        this.push(file);
      }
      next();
    } catch (err) {
      console.log("[" + chalk.cyan("stylusTransform") + "] Failed to transform " + chalk.red(file.path));
      log(err);
      next(err);
    }
  });
}
module.exports = stylusTransform;

//# sourceMappingURL=./stylus-transform.js.map