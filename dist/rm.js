"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var rm = regeneratorRuntime.mark(function rm(filepath) {
  return regeneratorRuntime.wrap(function rm$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return cofs.exists(filepath);
      case 2:
        if (!context$1$0.sent) {
          context$1$0.next = 16;
          break;
        }
        context$1$0.next = 5;
        return cofs.stat(filepath);
      case 5:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 14;
          break;
        }
        context$1$0.next = 8;
        return cofs.readdir(filepath);
      case 8:
        context$1$0.next = 10;
        return context$1$0.sent.map(function (item) {
          return rm(path.resolve(filepath, item));
        });
      case 10:
        context$1$0.next = 12;
        return cofs.rmdir(filepath);
      case 12:
        context$1$0.next = 16;
        break;
      case 14:
        context$1$0.next = 16;
        return cofs.unlink(filepath);
      case 16:
      case "end":
        return context$1$0.stop();
    }
  }, rm, this);
});

var cofs = _interopRequire(require("./cofs"));

var path = _interopRequire(require("path"));

module.exports = rm;
//remove content of directory