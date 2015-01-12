import reactTools from 'react-tools';
import through from 'through2';
import applyMap from 'vinyl-sourcemaps-apply';
import debug from 'debug';
import chalk from 'chalk';

var log = debug('transform:jsx');
/**
 *  @function jsxTransform
 *
 */
function jsxTransform() {
  return through.obj(function (file, enc, next) {
    try {
      var useSourceMap = !!file.sourceMap;
      //skip regular js files
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.jsx$/i)) {
        var source = file.contents.toString(enc);
        var output = reactTools.transformWithDetails(source, {
          sourceMap: useSourceMap,
          filename: file.relative.replace(/\.jsx$/i, '.js'),
          harmony: true,
          es5: true
        });
        file.contents = new Buffer(output.code);
        if (useSourceMap) {
          //manually add sourcemap information
          output.sourceMap.sources = [file.relative];
          output.sourceMap.sourceRoot = file.buildStep || file.sourceMap.sourceRoot;
          applyMap(file, output.sourceMap);
          file.buildStep = '@jsx-transform/';
        }
        file.path = file.path.replace(/\.jsx$/i, '.js');
        this.push(file);
      } else {
        this.push(file);
      }
      next();
    } catch (err) {
      console.log(`[${chalk.cyan('jsxTransform')}] Failed to transform ${chalk.red(file.path)}`);
      next(err);
    }
  });
}
export default jsxTransform;
