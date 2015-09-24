export default async function asyncForeach(arr, fn) {
  //prevent array getting modified during the async action
  arr = arr.slice();
  for(let i = 0, len = arr.length; i < len; i++) {
    await fn(arr[i], i);
  }
}
