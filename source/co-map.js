/**
 * @function
 *  @param {array} array - The array to iterate over
 *  @param {function} - The generator function
 *    usage: yield map(arr, fn) would return the resulting array asynchronously
 */
export default function * map(arr, fn) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    result.push(yield fn(arr[i], i));
  }
  return result;
}
