import through from 'through2';
import cofs from 'co-fs';
import co from 'co';
import path from 'path';

/**
 * @function loadMap
 */
function loadMap(ext){
  ext = ext || '.map';
  return through.obj(function (file, enc, cb) {
    if(file.isNull()) {
      cb();
    } else {
      var self = this;
      co(function *() {
        var mapFile = file.path + ext;
        var map;
        try {
        if(yield cofs.exists(mapFile)) {
          map = JSON.parse(yield cofs.readFile(mapFile));
        } else {
          map = {
            version : 3,
            file: file.relative,
            names: [],
            mappings: '',
            sources: [file.relative],
            sourcesContent:[file.contents.toString(enc)],
            sourceRoot: '/' + path.relative(file.cwd, file.base) + '/'
          };
        }
        file.sourceMap = map;
        } catch(err) {
          console.log(err);
        }
        self.push(file);
        cb();
      });
    }
  });
}

export default loadMap;
