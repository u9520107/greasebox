export default async function asyncMap(arr, fn) {
  arr = arr.slice();
  let result = [];
  for(let i = 0, len = arr.length; i < len; i++) {
    result.push(await fn(arr[i], i));
  }
  return result;
}
