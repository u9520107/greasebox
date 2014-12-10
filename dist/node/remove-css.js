"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__recast__,
    $__vinyl_45_sourcemaps_45_apply__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var recast = ($__recast__ = require("recast"), $__recast__ && $__recast__.__esModule && $__recast__ || {default: $__recast__}).default;
var applyMap = ($__vinyl_45_sourcemaps_45_apply__ = require("vinyl-sourcemaps-apply"), $__vinyl_45_sourcemaps_45_apply__ && $__vinyl_45_sourcemaps_45_apply__.__esModule && $__vinyl_45_sourcemaps_45_apply__ || {default: $__vinyl_45_sourcemaps_45_apply__}).default;
function removeCss() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.(js|jsx)$/)) {
        var ast = recast.parse(file.contents.toString(enc), {sourceFileName: file.relative});
        var body = [];
        ast.program.body.forEach(function(part) {
          if (part.type === 'ImportDeclaration' && part.source.value.match(/\.css!$/i)) {} else {
            body.push(part);
          }
        });
        ast.program.body = body;
        var output = recast.print(ast, {sourceMapName: file.relative});
        file.contents = new Buffer(output.code);
        if (file.sourceMap && output.map) {
          output.map.sourceRoot = file.buildStep;
          applyMap(file, output.map);
          file.buildStep = '@remove-css/';
        }
        this.push(file);
      } else {
        this.push(file);
      }
      next();
    } catch (err) {
      next(err);
    }
  });
}
var $__default = removeCss;

//# sourceMappingURL=remove-css.js.map
//# sourceURL=remove-css.js