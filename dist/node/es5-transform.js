"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__traceur__,
    $__vinyl_45_sourcemaps_45_apply__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var traceur = ($__traceur__ = require("traceur"), $__traceur__ && $__traceur__.__esModule && $__traceur__ || {default: $__traceur__}).default;
var applyMap = ($__vinyl_45_sourcemaps_45_apply__ = require("vinyl-sourcemaps-apply"), $__vinyl_45_sourcemaps_45_apply__ && $__vinyl_45_sourcemaps_45_apply__.__esModule && $__vinyl_45_sourcemaps_45_apply__ || {default: $__vinyl_45_sourcemaps_45_apply__}).default;
function es5Transform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.js$/i)) {
        var tc = new traceur.Compiler({
          modules: 'instantiate',
          sourceMaps: 'file'
        });
        file.contents = new Buffer(tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map', '/source/'));
        if (file.sourceMap) {
          var map = JSON.parse(tc.getSourceMap());
          if (map) {
            map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
            applyMap(file, map);
            file.buildStep = '@traceur/';
          }
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
var $__default = es5Transform;

//# sourceMappingURL=es5-transform.js.map
//# sourceURL=es5-transform.js