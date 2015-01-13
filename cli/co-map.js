"use strict";
var $__0 = $traceurRuntime.initGeneratorFunction(map);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
function map(arr, fn) {
  var result,
      i,
      len,
      $__1,
      $__2,
      $__3,
      $__4,
      $__5;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          result = [];
          $ctx.state = 15;
          break;
        case 15:
          i = 0, len = arr.length;
          $ctx.state = 11;
          break;
        case 11:
          $ctx.state = (i < len) ? 5 : 9;
          break;
        case 8:
          i++;
          $ctx.state = 11;
          break;
        case 5:
          $__1 = result.push;
          $__2 = arr[i];
          $__3 = fn($__2);
          $ctx.state = 6;
          break;
        case 6:
          $ctx.state = 2;
          return $__3;
        case 2:
          $__4 = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $__5 = $__1.call(result, $__4);
          $ctx.state = 8;
          break;
        case 9:
          $ctx.returnValue = result;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__0, this);
}
var $__default = map;
//# sourceURL=co-map.js