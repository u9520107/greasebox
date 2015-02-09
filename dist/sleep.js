/**
 * @exports default
 * @function
 * @param {Number} t - time in milliseconds
 *  Asynchronously sleeps for time t when used in generator context.
 *  Returns a promise if promises are prefered.
 *  Thunk based sleep is lighter, but isnt' as flexible.
 */

export default function sleep(t) {
  t = ~~t;
  if (t > 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  } else {
    return Promise.resolve();
  }
}
