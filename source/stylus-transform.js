import through from 'through2';
import Renderer from 'stylus/lib/renderer';
import applyMap from 'vinyl-sourcemaps-apply';
/**
 * @function
 *
 */
function stylusTransform() {
  return through.obj(function (file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.styl$/)) {
        var src = file.contents.toString(enc);
        var useSourceMaps = !!file.sourceMap;
        var opts = { filename: file.relative };
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
export default stylusTransform;