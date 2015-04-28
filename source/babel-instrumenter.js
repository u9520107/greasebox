import istanbul from 'istanbul';
import esprima from 'esprima-fb';
import sourceMap from 'source-map';
import path from 'path';
import fs from 'fs';
import * as babel from 'babel-core';

function createSourceMapConsumer(map) {
  if (typeof map === 'string') {
    map = JSON.parse(map);
  }
  return new sourceMap.SourceMapConsumer(map);
}
/**
 *  Istanbul instrumenter extention that compiles es6 source into es5 version
 *
 *  @class BabelInstrumenter
 *  @extends instanbul.Instrumenter
 */
export default class BabelInstrumenter extends istanbul.Instrumenter {
  /**
   *  @constructor
   *  @param {object} opts - options passed to istanbul.Instrumenter
   */
  constructor(opts = {}) {
    super();
    istanbul.Instrumenter.call(this, opts);
  }
  _compile(code, filename) {
    var compiled = babel.transform(code, {
      filename: filename,
      sourceMap: true
    });
    return compiled;
  }
  _parse(code) {
    var program = esprima.parse(code, {
      loc: true,
      range: true,
      sourceType: 'module',
      es5: true,
      comment: true
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
  }
  getPreamble(sourceCode, emitUseStrict) {
    if (this._sourceMap) {
      var statementMap = this.coverState.statementMap, functionMap = this.coverState.fnMap, branchMap = this.coverState.branchMap, key = null, map = null;
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
