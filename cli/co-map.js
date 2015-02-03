"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * @function
 *  @param {array} array - The array to iterate over
 *  @param {function} - The generator function
 *    usage: yield map(arr, fn) would return the resulting array asynchronously
 */
//export default function * map(arr, fn) {
//  var result = [];
//  for (var i = 0, len = arr.length; i < len; i++) {
//    result.push(yield fn(arr[i], i));
//  }
//  return result;
//}

module.exports = map;
var co = _interopRequire(require("co"));

function map(arr, fn) {
  return co(regeneratorRuntime.mark(function callee$1$0() {
    var result, i, len;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          result = [];
          i = 0, len = arr.length;
        case 2:
          if (!(i < len)) {
            context$2$0.next = 10;
            break;
          }
          context$2$0.next = 5;
          return fn(arr[i], i);
        case 5:
          context$2$0.t6 = context$2$0.sent;
          result.push(context$2$0.t6);

        case 7:
          i++;
          context$2$0.next = 2;
          break;
        case 10:
          return context$2$0.abrupt("return", result);
        case 11:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  }));
}