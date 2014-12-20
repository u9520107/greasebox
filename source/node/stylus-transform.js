import through from 'through2';
import Renderer from 'stylus/lib/renderer';
import applyMap from 'vinyl-sourcemaps-apply';

/**
 * @function
 *
 */
function stylusTransform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if(file.path.match(/\.(styl)$/)){
        
        var src = file.contents.toString(enc);
        var renderer = new Renderer(src, {
          filename: file.relative,
          sourcemap: 'comment'
        });
        var output = renderer.render();

        file.contents = new Buffer(output);
        if (file.sourceMap && renderer.sourcemap) {
          var map = JSON.parse(renderer.sourcemap);

          map.sourceRoot = file.buildStep;
          applyMap(file, map);
          file.buildStep = '@stylus/';

        }
        
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
