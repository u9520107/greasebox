"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var through = _interopRequire(require("through2"));

var Renderer = _interopRequire(require("stylus/lib/renderer"));

var applyMap = _interopRequire(require("vinyl-sourcemaps-apply"));

var path = _interopRequire(require("path"));

var chalk = _interopRequire(require("chalk"));

var debug = _interopRequire(require("debug"));

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