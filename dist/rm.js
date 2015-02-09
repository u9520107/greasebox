import cofs from './cofs';
import co from 'co';
import path from 'path';

export default function rm(filepath) {
  return co(function * () {
    if (yield cofs.exists(filepath)) {
      if ((yield cofs.stat(filepath)).isDirectory()) {
        //remove content of directory
        yield (yield cofs.readdir(filepath)).map(function (item) {
          return rm(path.resolve(filepath, item));
        });
        yield cofs.rmdir(filepath);
      } else {
        yield cofs.unlink(filepath);
      }
    }
  });
}
