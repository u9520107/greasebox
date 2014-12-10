"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__react_45_tools__,
    $__through2__,
    $__vinyl_45_sourcemaps_45_apply__;
var reactTools = ($__react_45_tools__ = require("react-tools"), $__react_45_tools__ && $__react_45_tools__.__esModule && $__react_45_tools__ || {default: $__react_45_tools__}).default;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var applyMap = ($__vinyl_45_sourcemaps_45_apply__ = require("vinyl-sourcemaps-apply"), $__vinyl_45_sourcemaps_45_apply__ && $__vinyl_45_sourcemaps_45_apply__.__esModule && $__vinyl_45_sourcemaps_45_apply__ || {default: $__vinyl_45_sourcemaps_45_apply__}).default;
function jsxTransform() {
  return through.obj(function(file, enc, cb) {
    try {
      var useSourceMap = !!file.sourceMap;
      if (file.path.match(/\.jsx$/i)) {
        var source = file.contents.toString(enc);
        var output = reactTools.transformWithDetails(source, {
          sourceMap: useSourceMap,
          filename: file.relative.replace(/\.jsx$/i, '.js'),
          harmony: true
        });
        file.contents = new Buffer(output.code);
        if (useSourceMap) {
          output.sourceMap.sources = [file.relative];
          output.sourceMap.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, output.sourceMap);
          file.buildStep = '@jsx-transform/';
        }
        file.path = file.path.replace(/\.jsx$/i, '.js');
        this.push(file);
      } else if (file.path.match(/\.js$/i)) {
        this.push(file);
      }
      cb();
    } catch (err) {
      console.log(err);
      cb(err);
    }
  });
}
var $__default = jsxTransform;

//# sourceMappingURL=jsx-transform.js.map
//# sourceURL=jsx-transform.js