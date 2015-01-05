"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__cofs__,
    $__path__;
var cofs = ($__cofs__ = require("./cofs"), $__cofs__ && $__cofs__.__esModule && $__cofs__ || {default: $__cofs__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
function* rm(filepath) {
  if (yield cofs.exists(filepath)) {
    if ((yield cofs.stat(filepath)).isDirectory()) {
      yield (yield cofs.readdir(filepath)).map(function(item) {
        return rm(path.resolve(filepath, item));
      });
      yield cofs.rmdir(filepath);
    } else {
      yield cofs.unlink(filepath);
    }
  }
}
var $__default = rm;

//# sourceMappingURL=rm.js.map
//# sourceURL=rm.js