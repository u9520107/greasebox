"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__co_45_read__;
var read = ($__co_45_read__ = require("co-read"), $__co_45_read__ && $__co_45_read__.__esModule && $__co_45_read__ || {default: $__co_45_read__}).default;
function coStream(stream) {
  return $traceurRuntime.initGeneratorFunction(function $__1(end) {
    var $__2,
        $__3;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (end) ? 3 : 2;
            break;
          case 3:
            if (stream.end)
              stream.end();
            else if (stream.close)
              stream.close();
            else if (stream.destroy)
              stream.destroy();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = -2;
            break;
          case 2:
            $__2 = read(stream);
            $ctx.state = 11;
            break;
          case 11:
            $ctx.state = 7;
            return $__2;
          case 7:
            $__3 = $ctx.sent;
            $ctx.state = 9;
            break;
          case 9:
            $ctx.returnValue = $__3;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__1, this);
  });
}
var $__default = coStream;
//# sourceURL=co-stream.js