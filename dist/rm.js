"use strict";
var $__2 = $traceurRuntime.initGeneratorFunction(rm);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__co_45_fs__,
    $__path__;
var cofs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
function rm(filepath) {
  var $__3,
      $__4,
      $__5,
      $__6,
      $__7,
      $__8,
      $__9,
      $__10,
      $__11,
      $__12,
      $__13,
      $__14,
      $__15,
      $__16,
      $__17,
      $__18;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $__3 = cofs.exists;
          $__4 = $__3.call(cofs, filepath);
          $ctx.state = 6;
          break;
        case 6:
          $ctx.state = 2;
          return $__4;
        case 2:
          $__5 = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $ctx.state = ($__5) ? 11 : -2;
          break;
        case 11:
          $__6 = cofs.stat;
          $__7 = $__6.call(cofs, filepath);
          $ctx.state = 12;
          break;
        case 12:
          $ctx.state = 8;
          return $__7;
        case 8:
          $__8 = $ctx.sent;
          $ctx.state = 10;
          break;
        case 10:
          $__9 = $__8.isDirectory;
          $__10 = $__9.call($__8);
          $ctx.state = 14;
          break;
        case 14:
          $ctx.state = ($__10) ? 19 : 31;
          break;
        case 19:
          $__11 = cofs.readdir;
          $__12 = $__11.call(cofs, filepath);
          $ctx.state = 20;
          break;
        case 20:
          $ctx.state = 16;
          return $__12;
        case 16:
          $__13 = $ctx.sent;
          $ctx.state = 18;
          break;
        case 18:
          $__14 = $__13.map;
          $__18 = $__14.call($__13, function(item) {
            return $__15 = path.resolve, $__16 = $__15.call(path, filepath, item), $__17 = rm($__16), $__17;
          });
          $ctx.state = 22;
          break;
        case 22:
          $ctx.state = 24;
          return $__18;
        case 24:
          $ctx.maybeThrow();
          $ctx.state = 26;
          break;
        case 26:
          $ctx.state = 28;
          return cofs.rmdir(filepath);
        case 28:
          $ctx.maybeThrow();
          $ctx.state = -2;
          break;
        case 31:
          $ctx.state = 32;
          return cofs.unlink(filepath);
        case 32:
          $ctx.maybeThrow();
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__2, this);
}
var $__default = rm;

//# sourceMappingURL=rm.js.map
//# sourceURL=rm.js