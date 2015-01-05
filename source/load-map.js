import through from 'through2';
import cofs from './cofs';
import co from 'co';
import path from 'path';

/**
 * @function loadMap
 */
function loadMap(ext) {
  if(!ext) {
    ext = '.map';
  }
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next();
    } else {
      var self = this;
      co(function*() {
        var mapFile = file.path + ext;
        var map;
        try {
          if (
         yield cofs.exists(mapFile)) {
            map = JSON.parse(
              yield cofs.readFile(mapFile));
          } else {
            map = {
              version: 3,
              file: file.relative,
              names: [],
              mappings: '',
              sources: [file.relative],
              sourcesContent: [file.contents.toString(enc)],
              sourceRoot: '/' + path.relative(file.cwd, file.base) + '/'
            };
          }
          file.sourceMap = map;
          self.push(file);
          next();
        } catch (err) {
          next(err);
        }
      });
    }
  });
}

export
default loadMap;
