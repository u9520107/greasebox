"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * @function
 *  @param {array} array - The array to iterate over
 *  @param {function} - The generator function
 *    usage: yield forEach(arr, fn) would iterate through the array
 */
//export default function * forEach(arr, fn) {
//  for (var i = 0, len = arr.length; i < len; i++) {
//    yield fn(arr[i], i);
//  }
//}

module.exports = forEach;
var co = _interopRequire(require("co"));

function forEach(arr, fn) {
  return co(regeneratorRuntime.mark(function callee$1$0() {
    var i, len;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!fn) {
            context$2$0.next = 8;
            break;
          }
          i = 0, len = arr.length;
        case 2:
          if (!(i < len)) {
            context$2$0.next = 8;
            break;
          }
          context$2$0.next = 5;
          return fn(arr[i], i);
        case 5:
          i++;
          context$2$0.next = 2;
          break;
        case 8:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
}

//# sourceMappingURL=./co-foreach.js.map