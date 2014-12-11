import cofs from 'co-fs';
import path from 'path';

function *rm(filepath) {
  if(yield cofs.exists(filepath)) {
    if((yield cofs.stat(filepath)).isDirectory()) {
      //remove content of directory
      yield (yield cofs.readdir(filepath)).map(function (item) {
        return rm(path.resolve(filepath, item));
      });
      yield cofs.rmdir(filepath);
    } else {
      yield cofs.unlink(filepath);
    }
  }
}

export default rm;
