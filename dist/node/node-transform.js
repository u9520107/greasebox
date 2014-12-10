"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__recast__,
    $__traceur__,
    $__vinyl_45_sourcemaps_45_apply__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var recast = ($__recast__ = require("recast"), $__recast__ && $__recast__.__esModule && $__recast__ || {default: $__recast__}).default;
var traceur = ($__traceur__ = require("traceur"), $__traceur__ && $__traceur__.__esModule && $__traceur__ || {default: $__traceur__}).default;
var applyMap = ($__vinyl_45_sourcemaps_45_apply__ = require("vinyl-sourcemaps-apply"), $__vinyl_45_sourcemaps_45_apply__ && $__vinyl_45_sourcemaps_45_apply__.__esModule && $__vinyl_45_sourcemaps_45_apply__ || {default: $__vinyl_45_sourcemaps_45_apply__}).default;
function nodeTransform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else {
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
        }
        var tc = new traceur.Compiler({
          modules: 'commonjs',
          sourceMaps: 'file',
          generators: 'parse'
        });
        output = tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map');
        file.contents = new Buffer(output);
        if (file.sourceMap) {
          var map = JSON.parse(tc.getSourceMap());
          map.sourceRoot = '@remove-css/';
          applyMap(file, map);
        }
        this.push(file);
        next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
var $__default = nodeTransform;

//# sourceMappingURL=node-transform.js.map
//# sourceURL=node-transform.js