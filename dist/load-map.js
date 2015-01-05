"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__cofs__,
    $__co__,
    $__path__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var cofs = ($__cofs__ = require("./cofs"), $__cofs__ && $__cofs__.__esModule && $__cofs__ || {default: $__cofs__}).default;
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
      co(function*() {
        var mapFile = file.path + ext;
        var map;
        try {
          if (yield cofs.exists(mapFile)) {
            map = JSON.parse(yield cofs.readFile(mapFile));
          } else {
            map = {
              version: 3,
              file: file.relative,
              names: [],
              mappings: '',
              sources: [file.relative],
              sourcesContent: [file.contents.toString(enc)],
              sourceRoot: '/' + path.relative(file.cwd, file.base) + '/'
            };
          }
          file.sourceMap = map;
          self.push(file);
          next();
        } catch (err) {
          next(err);
        }
      });
    }
  });
}
var $__default = loadMap;

//# sourceMappingURL=load-map.js.map
//# sourceURL=load-map.js