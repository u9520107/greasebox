"use strict";
var $__0 = $traceurRuntime.initGeneratorFunction(forEach);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
function forEach(arr, fn) {
  var i,
      len;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          i = 0, len = arr.length;
          $ctx.state = 7;
          break;
        case 7:
          $ctx.state = (i < len) ? 1 : -2;
          break;
        case 4:
          i++;
          $ctx.state = 7;
          break;
        case 1:
          $ctx.state = 2;
          return fn(arr[i]);
        case 2:
          $ctx.maybeThrow();
          $ctx.state = 4;
          break;
        default:
          return $ctx.end();
      }
  }, $__0, this);
}
var $__default = forEach;
//# sourceURL=co-foreach.js