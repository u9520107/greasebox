"use strict";

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
    return new Promise(function (resolve) {
      setTimeout(resolve, t);
    });
  } else {
    return Promise.resolve();
  }
}

//# sourceMappingURL=./sleep.js.map