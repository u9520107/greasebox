import through from 'through2';
import traceur from 'traceur';
import applyMap from 'vinyl-sourcemaps-apply';

function es5Transform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else if (file.path.match(/\.js$/i)) {
        var tc = new traceur.Compiler({
          modules: 'instantiate',
          sourceMaps: 'file'
        });
        file.contents = new Buffer(tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map', '/source/'));
        if (file.sourceMap) {
          var map = JSON.parse(tc.getSourceMap());
          if (map) {
            map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot; 
            applyMap(file, map);
            file.buildStep = '@traceur/';
          }
        }
        this.push(file);
        next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}

export default es5Transform;
