"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
function* forEach(arr, fn) {
  for (var i = 0,
      len = arr.length; i < len; i++) {
    yield fn(arr[i]);
  }
}
var $__default = forEach;

//# sourceMappingURL=co-foreach.js.map
//# sourceURL=co-foreach.js