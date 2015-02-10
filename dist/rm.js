"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = rm;
var cofs = _interopRequire(require("./cofs"));

var co = _interopRequire(require("co"));

var path = _interopRequire(require("path"));

function rm(filepath) {
  return co(regeneratorRuntime.mark(function callee$1$0() {
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return cofs.exists(filepath);
        case 2:
          if (!context$2$0.sent) {
            context$2$0.next = 16;
            break;
          }
          context$2$0.next = 5;
          return cofs.stat(filepath);
        case 5:
          if (!context$2$0.sent.isDirectory()) {
            context$2$0.next = 14;
            break;
          }
          context$2$0.next = 8;
          return cofs.readdir(filepath);
        case 8:
          context$2$0.next = 10;
          return context$2$0.sent.map(function (item) {
            return rm(path.resolve(filepath, item));
          });
        case 10:
          context$2$0.next = 12;
          return cofs.rmdir(filepath);
        case 12:
          context$2$0.next = 16;
          break;
        case 14:
          context$2$0.next = 16;
          return cofs.unlink(filepath);
        case 16:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
}
//remove content of directory

//# sourceMappingURL=./rm.js.map