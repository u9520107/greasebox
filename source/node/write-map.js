import through from 'through2';
import cofs from 'co-fs';
import co from 'co';
import path from 'path';
import gutil from 'gulp-util';

function writeMap(root, ext) {
  ext = ext || '.map';
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb();
    } else {
      var sourceRoot = root || file.sourceMap.sourceRoot;

      //replace
      if(sourceRoot !== file.sourceMap.sourceRoot) {
        var nameCheck = new RegExp('^' + sourceRoot, 'i');
        file.sourceMap.sources = file.sourceMap.sources.map(function (name) {
          if(name[0] !== '/' && name[0] !== '@') {
            return file.sourceMap.sourceRoot + name; 
          }else if(name.match(nameCheck)) {
            return name.substring(sourceRoot.length);
          } else {
            return name;
          }
        
        });
        file.sourceMap.sourceRoot = sourceRoot;
      }

      var mapFile = new gutil.File({
        base: file.base,
        cwd: file.cwd,
        path: file.path + ext,
        contents: new Buffer(JSON.stringify(file.sourceMap))
      });
      this.push(file);
      this.push(mapFile);

      cb();
    }
  });

}

export default writeMap;
