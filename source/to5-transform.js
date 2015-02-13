import through from 'through2';
import applyMap from 'vinyl-sourcemaps-apply';
import debug from 'debug';
import chalk from 'chalk';
import to5 from '6to5';

let log = debug('to5Transform');
const DEFAULTS = {
  optional: ['selfContained']
};
function to5Transform(opts = {}) {
  if(!opts.optional) {
    opts.optional = DEFAULTS.optional;
  }
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
        var output = to5.transform(file.contents.toString(enc), opts);
        if(useSourceMap && output.map) {
          output.map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, output.map);
          file.buildStep = '@6to5/';
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
      console.log(`[${ chalk.cyan( 'to5Transform' ) }] Failed to transform ${chalk.red( file.path )}`);
      log(err);
      cb(err);
    }
  });
}
export default to5Transform;
