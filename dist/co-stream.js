"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var read = _to5Helpers.interopRequire(require("co-read"));

/**
 *  derived from juliangruber/co-from-stream
 */
function coStream(stream) {
  return function* (end) {
    if (end) {
      if (stream.end) stream.end();else if (stream.close) stream.close();else if (stream.destroy) stream.destroy();
      return;
    }
    return yield read(stream);
  };
}
module.exports = coStream;

//# sourceMappingURL=./co-stream.js.map