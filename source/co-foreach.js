
export default function * forEach(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    yield fn(arr[i]);
  }
}
