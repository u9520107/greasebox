"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

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
var co = _to5Helpers.interopRequire(require("co"));

function map(arr, fn) {
  return co(function* () {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      result.push((yield fn(arr[i], i)));
    }
    return result;
  });
}

//# sourceMappingURL=./co-map.js.map