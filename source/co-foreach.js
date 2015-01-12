/**
 * @function
 *  @param {array} array - The array to iterate over
 *  @param {function} - The generator function
 *    usage: yield forEach(arr, fn) would iterate through the array
 */
export default function * forEach(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    yield fn(arr[i]);
  }
}
