"use strict";

var _core = require("6to5-runtime/core-js");

/**
 * @exports default
 * @function
 * @param {Number} t - time in milliseconds
 *  Asynchronously sleeps for time t when used in generator context.
 *  Returns a promise if promises are prefered.
 *  Thunk based sleep is lighter, but isnt' as flexible.
 */

module.exports = sleep;
function sleep(t) {
  t = ~ ~t;
  if (t > 0) {
    return new _core.Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  } else {
    return _core.Promise.resolve();
  }
}

//# sourceMappingURL=./sleep.js.map