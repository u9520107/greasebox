"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

module.exports = rm;
var cofs = _to5Helpers.interopRequire(require("./cofs"));

var co = _to5Helpers.interopRequire(require("co"));

var path = _to5Helpers.interopRequire(require("path"));

function rm(filepath) {
  return co(function* () {
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

//# sourceMappingURL=./rm.js.map