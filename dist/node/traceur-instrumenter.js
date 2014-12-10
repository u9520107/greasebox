"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__istanbul__,
    $__esprima__,
    $__source_45_map__,
    $__escodegen__,
    $__traceur__,
    $__path__,
    $__fs__;
var istanbul = ($__istanbul__ = require("istanbul"), $__istanbul__ && $__istanbul__.__esModule && $__istanbul__ || {default: $__istanbul__}).default;
var esprima = ($__esprima__ = require("esprima"), $__esprima__ && $__esprima__.__esModule && $__esprima__ || {default: $__esprima__}).default;
var sourceMap = ($__source_45_map__ = require("source-map"), $__source_45_map__ && $__source_45_map__.__esModule && $__source_45_map__ || {default: $__source_45_map__}).default;
var escodegen = ($__escodegen__ = require("escodegen"), $__escodegen__ && $__escodegen__.__esModule && $__escodegen__ || {default: $__escodegen__}).default;
var traceur = ($__traceur__ = require("traceur"), $__traceur__ && $__traceur__.__esModule && $__traceur__ || {default: $__traceur__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var fs = ($__fs__ = require("fs"), $__fs__ && $__fs__.__esModule && $__fs__ || {default: $__fs__}).default;
var DEFAULT_TRACEUR_OPTIONS = {
  modules: 'commonjs',
  sourceMaps: 'file'
};
function createSourceMapConsumer(map) {
  if (typeof map === 'string') {
    map = JSON.parse(map);
  }
  return new sourceMap.SourceMapConsumer(map);
}
var TraceurInstrumenter = function TraceurInstrumenter() {
  var opts = arguments[0] !== (void 0) ? arguments[0] : {};
  istanbul.Instrumenter.call(this, opts);
  this._createTraceurCompiler(opts.traceurOpts);
};
var $TraceurInstrumenter = TraceurInstrumenter;
($traceurRuntime.createClass)(TraceurInstrumenter, {
  _createTraceurCompiler: function() {
    var opts = arguments[0] !== (void 0) ? arguments[0] : {};
    for (var key in DEFAULT_TRACEUR_OPTIONS) {
      if (!opts.hasOwnProperty(key)) {
        opts[key] = DEFAULT_TRACEUR_OPTIONS[key];
      }
    }
    this._compiler = new traceur.NodeCompiler(opts);
  },
  _compile: function(code, filename) {
    var compiled = this._compiler.compile(code, filename);
    return {
      code: compiled,
      map: this._compiler.getSourceMap()
    };
  },
  _parse: function(code) {
    var program = esprima.parse(code, {
      loc: true,
      range: true
    });
    return program;
  },
  instrumentSync: function(code, filename) {
    var compiled = this._compile(code, filename);
    var program = this._parse(compiled.code);
    this._sourceMap = createSourceMapConsumer(compiled.map);
    return this.instrumentASTSync(program, filename, code);
  },
  _fixLocation: function(location) {
    location.start = this._sourceMap.originalPositionFor(location.start);
    location.end = this._sourceMap.originalPositionFor(location.end);
    if (location.start.source !== this.coverState.path) {
      location.start = {
        line: 0,
        column: 0
      };
      location.end = {
        line: 0,
        column: 0
      };
      location.skip = true;
    }
  },
  getPreamble: function(sourceCode, emitUseStrict) {
    if (this._sourceMap) {
      var statementMap = this.coverState.statementMap,
          functionMap = this.coverState.fnMap,
          branchMap = this.coverState.branchMap,
          key = null,
          map = null;
      for (key in statementMap) {
        if (statementMap.hasOwnProperty(key)) {
          map = statementMap[key];
          this._fixLocation(map);
        }
      }
      for (key in functionMap) {
        if (functionMap.hasOwnProperty(key)) {
          map = functionMap[key];
          this._fixLocation(map.loc);
        }
      }
      for (key in branchMap) {
        if (branchMap.hasOwnProperty(key)) {
          var locations = branchMap[key].locations;
          for (var i = 0; i < locations.length; i++) {
            this._fixLocation(locations[i]);
          }
        }
      }
    }
    return $traceurRuntime.superGet(this, $TraceurInstrumenter.prototype, "getPreamble").call(this, sourceCode, emitUseStrict);
  }
}, {}, istanbul.Instrumenter);
var $__default = TraceurInstrumenter;

//# sourceMappingURL=traceur-instrumenter.js.map
//# sourceURL=traceur-instrumenter.js