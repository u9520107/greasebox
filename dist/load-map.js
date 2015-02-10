"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var through = _to5Helpers.interopRequire(require("through2"));

var cofs = _to5Helpers.interopRequire(require("./cofs"));

var co = _to5Helpers.interopRequire(require("co"));

var path = _to5Helpers.interopRequire(require("path"));

var chalk = _to5Helpers.interopRequire(require("chalk"));

var debug = _to5Helpers.interopRequire(require("debug"));

var log = debug("loadMap");
/**
 * @function loadMap
 */
function loadMap(ext) {
  if (!ext) {
    ext = ".map";
  }
  return through.obj(function (file, enc, next) {
    if (file.isNull()) {
      next();
    } else {
      var self = this;
      co(function* () {
        var mapFile = file.path + ext;
        var map;
        try {
          if (yield cofs.exists(mapFile)) {
            map = JSON.parse((yield cofs.readFile(mapFile)));
          } else {
            map = {
              version: 3,
              file: file.relative,
              names: [],
              mappings: "",
              sources: [file.relative],
              sourcesContent: [file.contents.toString(enc)],
              sourceRoot: "/" + path.relative(file.cwd, file.base) + "/"
            };
          }
          file.sourceMap = map;
          self.push(file);
          next();
        } catch (err) {
          console.log("[" + chalk.cyan("loadMap") + "] Failed to load source map for " + chalk.red(file.path));
          log(err);
          next(err);
        }
      });
    }
  });
}
module.exports = loadMap;

//# sourceMappingURL=./load-map.js.map