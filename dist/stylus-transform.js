"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__stylus_47_lib_47_renderer__,
    $__vinyl_45_sourcemaps_45_apply__,
    $__path__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var Renderer = ($__stylus_47_lib_47_renderer__ = require("stylus/lib/renderer"), $__stylus_47_lib_47_renderer__ && $__stylus_47_lib_47_renderer__.__esModule && $__stylus_47_lib_47_renderer__ || {default: $__stylus_47_lib_47_renderer__}).default;
var applyMap = ($__vinyl_45_sourcemaps_45_apply__ = require("vinyl-sourcemaps-apply"), $__vinyl_45_sourcemaps_45_apply__ && $__vinyl_45_sourcemaps_45_apply__.__esModule && $__vinyl_45_sourcemaps_45_apply__ || {default: $__vinyl_45_sourcemaps_45_apply__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
function stylusTransform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.styl$/)) {
        var src = file.contents.toString(enc);
        var useSourceMaps = !!file.sourceMap;
        var opts = {filename: path.basename(file.path)};
        if (useSourceMaps) {
          opts.sourcemap = 'comment';
        }
        var renderer = new Renderer(src, opts);
        var output = renderer.render();
        file.contents = new Buffer(output);
        if (file.sourceMap && renderer.sourcemap) {
          var map = renderer.sourcemap;
          map.sourcesContent = [src];
          map.sourceRoot = file.buildStep;
          applyMap(file, map);
          file.buildStep = '@stylus/';
        }
        file.path = file.path.replace(/\.styl$/, '.css');
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
var $__default = stylusTransform;

//# sourceMappingURL=stylus-transform.js.map
//# sourceURL=stylus-transform.js