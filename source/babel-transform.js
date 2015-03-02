import through from 'through2';
import applyMap from 'vinyl-sourcemaps-apply';
import debug from 'debug';
import chalk from 'chalk';
import * as babel from 'babel-core';

let log = debug('babelTransform');


function babelTransform(opts = {}) {
  return through.obj(function (file, enc, cb) {
    try {
      if (file.isNull()) {
        return cb();
      } else if (file.path.match(/\.(js|jsx)$/i)) {
        var useSourceMap = !!file.sourceMap;
        opts.sourceMap = useSourceMap;

        opts.filename = file.path;
        opts.filenameRelative = file.relative;

        var src = file.contents.toString(enc);
        var output = babel.transform(file.contents.toString(enc), opts);
        if(useSourceMap && output.map) {
          output.map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, output.map);
          file.buildStep = '@babel/';
        }
        file.contents = new Buffer(output.code);
        if(file.path.match(/\.jsx$/i)) {
          file.path = file.path.replace(/\.jsx$/i, '.js');
        }
        this.push(file);
      } else {
        this.push(file);
      }
      cb();
    } catch (err) {
      console.log(`[${ chalk.cyan( 'babelTransform' ) }] Failed to transform ${chalk.red( file.path )}`);
      log(err);
      cb(err);
    }
  });
}
export default babelTransform;
