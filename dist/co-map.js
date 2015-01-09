"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
function* map(arr, fn) {
  var result = [];
  for (var i = 0,
      len = arr.length; i < len; i++) {
    result.push(yield fn(arr[i]));
  }
  return result;
}
var $__default = map;

//# sourceMappingURL=co-map.js.map
//# sourceURL=co-map.js