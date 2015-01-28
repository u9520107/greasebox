"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var read = _interopRequire(require("co-read"));

/**
 *  derived from juliangruber/co-from-stream
 */
function coStream(stream) {
  return regeneratorRuntime.mark(function callee$1$0(end) {
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!end) {
            context$2$0.next = 3;
            break;
          }
          if (stream.end) stream.end();else if (stream.close) stream.close();else if (stream.destroy) stream.destroy();
          return context$2$0.abrupt("return");
        case 3:
          context$2$0.next = 5;
          return read(stream);
        case 5:
          return context$2$0.abrupt("return", context$2$0.sent);
        case 6:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
}
module.exports = coStream;