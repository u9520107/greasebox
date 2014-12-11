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
var DEFAULT_TRACEUR_OPTIONS = {modules: 'commonjs'};
function traceurTransform() {
  var opts = arguments[0] !== (void 0) ? arguments[0] : {};
  for (var key in DEFAULT_TRACEUR_OPTIONS) {
    if (!opts.hasOwnProperty(key)) {
      opts[key] = DEFAULT_TRACEUR_OPTIONS[key];
    }
  }
  return through.obj(function(file, enc, cb) {
    try {
      if (file.isNull()) {
        return cb();
      } else if (file.path.match(/\.js$/i)) {
        var useSourceMap = !!file.sourceMap;
        if (useSourceMap) {
          opts.sourceMaps = 'file';
        } else {
          opts.sourceMaps = false;
        }
        var tc = new traceur.Compiler(opts);
        file.contents = new Buffer(tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map', '/source/'));
        if (useSourceMap) {
          var map = JSON.parse(tc.getSourceMap());
          map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, map);
          file.buildStep = '@traceur/';
        }
        this.push(file);
      } else {
        this.push(file);
      }
      cb();
    } catch (err) {
      cb(err);
    }
  });
}
var $__default = traceurTransform;

//# sourceMappingURL=traceur-transform.js.map
//# sourceURL=traceur-transform.js