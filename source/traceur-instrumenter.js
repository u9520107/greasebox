import istanbul from 'istanbul';
import esprima from 'esprima-fb';
import sourceMap from 'source-map';
import traceur from 'traceur';
import path from 'path';
import fs from 'fs';

const DEFAULT_TRACEUR_OPTIONS = {
  modules: 'commonjs',
  sourceMaps: 'file'
};

function createSourceMapConsumer(map) {
  if (typeof map === 'string') {
    map = JSON.parse(map);
  }
  return new sourceMap.SourceMapConsumer(map);
}


/**
 *  Istanbul instrumenter extention that compiles es6 source into es5 version
 *
 *  @class TraceurInstrumenter
 *  @extends instanbul.Instrumenter
 */
class TraceurInstrumenter extends istanbul.Instrumenter {
  /**
   *  @constructor
   *  @param {object} opts - options passed to istanbul.Instrumenter
   */
  constructor(opts = {}) {
    istanbul.Instrumenter.call(this, opts);
    this._createTraceurCompiler(opts.traceurOpts);
  }

  /**
   *  Internal function used to set default values to _traceurOpts
   *
   *  @function
   *  @param {object} opts - traceurOpts passed from constructor
   */
  _createTraceurCompiler(opts = {}) {
    for (var key in DEFAULT_TRACEUR_OPTIONS) {
      if (!opts.hasOwnProperty(key)) {
        opts[key] = DEFAULT_TRACEUR_OPTIONS[key];
      }
    }
    this._compiler = new traceur.NodeCompiler(opts);
  }


  _compile(code, filename) {
    var compiled = this._compiler.compile(code, filename);

    return {
      code: compiled,
      map: this._compiler.getSourceMap()
    };
  }

  _parse(code) {

    var program = esprima.parse(code, {
      loc: true,
      range: true,
      sourceType: 'module'
    });
    return program;
  }

  instrumentSync(code, filename) {

      var compiled = this._compile(code, filename);
      var program = this._parse(compiled.code);


      this._sourceMap = createSourceMapConsumer(compiled.map);

      return this.instrumentASTSync(program, filename, code);
  }

    /**
     * Fix the location using the source maps used to compile and generate the
     *  code.
     * @param {Object} location The location to fix.
     */
  _fixLocation(location) {
    location.start = this._sourceMap.originalPositionFor(
      location.start);
      location.end = this._sourceMap.originalPositionFor(location.end);
      if(location.start.source !== this.coverState.path) {
        location.start = {line: 0, column: 0};
        location.end = { line: 0, column: 0};
        location.skip = true;
      }
  }


  getPreamble(sourceCode, emitUseStrict) {
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

    return super.getPreamble(sourceCode, emitUseStrict);
  }

}

export
default TraceurInstrumenter;
