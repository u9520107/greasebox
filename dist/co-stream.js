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
  return function*(end) {
    if (end) {
      if (stream.end)
        stream.end();
      else if (stream.close)
        stream.close();
      else if (stream.destroy)
        stream.destroy();
      return;
    }
    return yield read(stream);
  };
}
var $__default = coStream;

//# sourceMappingURL=co-stream.js.map
//# sourceURL=co-stream.js