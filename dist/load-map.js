"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var through = _interopRequire(require("through2"));

var cofs = _interopRequire(require("./cofs"));

var co = _interopRequire(require("co"));

var path = _interopRequire(require("path"));

var chalk = _interopRequire(require("chalk"));

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
      co(regeneratorRuntime.mark(function callee$2$0() {
        var mapFile, map;
        return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              mapFile = file.path + ext;
              context$3$0.prev = 1;
              context$3$0.next = 4;
              return cofs.exists(mapFile);
            case 4:
              if (!context$3$0.sent) {
                context$3$0.next = 11;
                break;
              }
              context$3$0.next = 7;
              return cofs.readFile(mapFile);
            case 7:
              context$3$0.t4 = context$3$0.sent;
              map = JSON.parse(context$3$0.t4);
              context$3$0.next = 12;
              break;
            case 11:
              map = {
                version: 3,
                file: file.relative,
                names: [],
                mappings: "",
                sources: [file.relative],
                sourcesContent: [file.contents.toString(enc)],
                sourceRoot: "/" + path.relative(file.cwd, file.base) + "/"
              };
            case 12:
              file.sourceMap = map;
              self.push(file);
              next();
              context$3$0.next = 21;
              break;
            case 17:
              context$3$0.prev = 17;
              context$3$0.t5 = context$3$0["catch"](1);
              console.log("[" + chalk.cyan("loadMap") + "] Failed to load source map for " + chalk.red(file.path));
              next(context$3$0.t5);
            case 21:
            case "end":
              return context$3$0.stop();
          }
        }, callee$2$0, this, [[1, 17]]);
      }));
    }
  });
}
module.exports = loadMap;