"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var _core = require("6to5-runtime/core-js");

var istanbul = _to5Helpers.interopRequire(require("istanbul"));

var esprima = _to5Helpers.interopRequire(require("esprima-fb"));

var sourceMap = _to5Helpers.interopRequire(require("source-map"));

var path = _to5Helpers.interopRequire(require("path"));

var fs = _to5Helpers.interopRequire(require("fs"));

var to5 = _to5Helpers.interopRequire(require("6to5"));

function createSourceMapConsumer(map) {
  if (typeof map === "string") {
    map = JSON.parse(map);
  }
  return new sourceMap.SourceMapConsumer(map);
}
/**
 *  Istanbul instrumenter extention that compiles es6 source into es5 version
 *
 *  @class To5Instrumenter
 *  @extends instanbul.Instrumenter
 */
var To5Instrumenter = (function (_istanbul$Instrumenter) {
  /**
   *  @constructor
   *  @param {object} opts - options passed to istanbul.Instrumenter
   */
  function To5Instrumenter() {
    var opts = arguments[0] === undefined ? {} : arguments[0];
    _to5Helpers.classCallCheck(this, To5Instrumenter);

    istanbul.Instrumenter.call(this, opts);
  }

  _to5Helpers.inherits(To5Instrumenter, _istanbul$Instrumenter);

  _to5Helpers.prototypeProperties(To5Instrumenter, null, {
    _compile: {
      value: function _compile(code, filename) {
        var compiled = to5.transform(code, {
          filename: filename,
          sourceMap: true
        });
        return compiled;
      },
      writable: true,
      configurable: true
    },
    _parse: {
      value: function _parse(code) {
        var program = esprima.parse(code, {
          loc: true,
          range: true,
          sourceType: "module",
          es5: true,
          comment: true
        });
        return program;
      },
      writable: true,
      configurable: true
    },
    instrumentSync: {
      value: function instrumentSync(code, filename) {
        var compiled = this._compile(code, filename);
        var program = this._parse(compiled.code);
        this._sourceMap = createSourceMapConsumer(compiled.map);
        return this.instrumentASTSync(program, filename, code);
      },
      writable: true,
      configurable: true
    },
    _fixLocation: {
      /**
         * Fix the location using the source maps used to compile and generate the
         *  code.
         * @param {Object} location The location to fix.
         */
      value: function _fixLocation(location) {
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
      writable: true,
      configurable: true
    },
    getPreamble: {
      value: function getPreamble(sourceCode, emitUseStrict) {
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
        return _to5Helpers.get(_core.Object.getPrototypeOf(To5Instrumenter.prototype), "getPreamble", this).call(this, sourceCode, emitUseStrict);
      },
      writable: true,
      configurable: true
    }
  });

  return To5Instrumenter;
})(istanbul.Instrumenter);

module.exports = To5Instrumenter;

//# sourceMappingURL=./to5-instrumenter.js.map