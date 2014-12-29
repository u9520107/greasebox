"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__co_45_fs__,
    $__co__,
    $__path__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var cofs = ($__co_45_fs__ = require("co-fs"), $__co_45_fs__ && $__co_45_fs__.__esModule && $__co_45_fs__ || {default: $__co_45_fs__}).default;
var co = ($__co__ = require("co"), $__co__ && $__co__.__esModule && $__co__ || {default: $__co__}).default;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
function loadMap(ext) {
  if (!ext) {
    ext = '.map';
  }
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next();
    } else {
      var self = this;
      co($traceurRuntime.initGeneratorFunction(function $__4() {
        var mapFile,
            map,
            $__5,
            $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            err;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                mapFile = file.path + ext;
                $ctx.state = 30;
                break;
              case 30:
                $ctx.pushTry(20, null);
                $ctx.state = 23;
                break;
              case 23:
                $__5 = cofs.exists;
                $__6 = $__5.call(cofs, mapFile);
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return $__6;
              case 2:
                $__7 = $ctx.sent;
                $ctx.state = 4;
                break;
              case 4:
                $ctx.state = ($__7) ? 11 : 15;
                break;
              case 11:
                $__8 = JSON.parse;
                $__9 = cofs.readFile;
                $__10 = $__9.call(cofs, mapFile);
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = 8;
                return $__10;
              case 8:
                $__11 = $ctx.sent;
                $ctx.state = 10;
                break;
              case 10:
                $__12 = $__8.call(JSON, $__11);
                map = $__12;
                $ctx.state = 14;
                break;
              case 15:
                map = {
                  version: 3,
                  file: file.relative,
                  names: [],
                  mappings: '',
                  sources: [file.relative],
                  sourcesContent: [file.contents.toString(enc)],
                  sourceRoot: '/' + path.relative(file.cwd, file.base) + '/'
                };
                $ctx.state = 14;
                break;
              case 14:
                file.sourceMap = map;
                self.push(file);
                next();
                $ctx.state = 19;
                break;
              case 19:
                $ctx.popTry();
                $ctx.state = -2;
                break;
              case 20:
                $ctx.popTry();
                err = $ctx.storedException;
                $ctx.state = 26;
                break;
              case 26:
                next(err);
                $ctx.state = -2;
                break;
              default:
                return $ctx.end();
            }
        }, $__4, this);
      }));
    }
  });
}
var $__default = loadMap;

//# sourceMappingURL=load-map.js.map
//# sourceURL=load-map.js