import through from 'through2';
import traceur from 'traceur';
import applyMap from 'vinyl-sourcemaps-apply';

const DEFAULT_TRACEUR_OPTIONS = {
  modules: 'commonjs'
};

function traceurTransform(opts = {}) {
  for(var key in DEFAULT_TRACEUR_OPTIONS) {
    if(!opts.hasOwnProperty(key)){
      opts[key] = DEFAULT_TRACEUR_OPTIONS[key];
    }
  }
  return through.obj(function(file, enc, cb) {
    try {
      if (file.isNull()) {
        return cb();
      } else if (file.path.match(/\.js$/i)) {
        var useSourceMap = !!file.sourceMap;
        if(useSourceMap) {
          opts.sourceMaps = 'file';
        } else {
          opts.sourceMaps = false;
        }

        var tc = new traceur.Compiler(opts);
        file.contents = new Buffer(tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map', '/source/'));
        if (useSourceMap) {
          var map = JSON.parse(tc.getSourceMap());
          map.sourceRoot = file.buildStep || file.sourceMap.sourceRoot; 
          applyMap(file, map);
          file.buildStep = '@traceur/';
          
        }
        this.push(file);
      } else {
        this.push(file);
      }
      cb();
    } catch (err) {
      cb(err);
    }
  });
}

export default traceurTransform;
