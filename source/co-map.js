
export default function * map(arr, fn) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    result.push(yield fn(arr[i]));
  }
  return result;
}
