"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

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
var co = _to5Helpers.interopRequire(require("co"));

function forEach(arr, fn) {
  return co(function* () {
    if (fn) {
      for (var i = 0, len = arr.length; i < len; i++) {
        yield fn(arr[i], i);
      }
    }
  });
}

//# sourceMappingURL=./co-foreach.js.map