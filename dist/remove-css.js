"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var through = _to5Helpers.interopRequire(require("through2"));

var recast = _to5Helpers.interopRequire(require("recast"));

var applyMap = _to5Helpers.interopRequire(require("vinyl-sourcemaps-apply"));

var chalk = _to5Helpers.interopRequire(require("chalk"));

var debug = _to5Helpers.interopRequire(require("debug"));

var log = debug("removeCss");
/**
 * @function
 *
 */
function removeCss() {
  return through.obj(function (file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.(js|jsx)$/)) {
        var ast = recast.parse(file.contents.toString(enc), { sourceFileName: file.relative });
        var body = [];
        //remove css imports
        ast.program.body.forEach(function (part) {
          if (part.type === "ImportDeclaration" && part.source.value.match(/\.css!$/i)) {
            log("removed %s", part.source.value);
          } else {
            body.push(part);
          }
        });
        ast.program.body = body;
        var output = recast.print(ast, { sourceMapName: file.relative });
        file.contents = new Buffer(output.code);
        if (file.sourceMap && output.map) {
          output.map.sourceRoot = file.buildStep;
          applyMap(file, output.map);
          file.buildStep = "@remove-css/";
        }
        this.push(file);
      } else {
        this.push(file);
      }
      next();
    } catch (err) {
      console.log("[" + chalk.cyan("removeCss") + "] Failed to transform " + chalk.red(file.path));
      log(err);
      next(err);
    }
  });
}
module.exports = removeCss;

//# sourceMappingURL=./remove-css.js.map