"use strict";

var forEach = regeneratorRuntime.mark( /**
                                        * @function
                                        *  @param {array} array - The array to iterate over
                                        *  @param {function} - The generator function
                                        *    usage: yield forEach(arr, fn) would iterate through the array
                                        */
function forEach(arr, fn) {
  var i, len;
  return regeneratorRuntime.wrap(function forEach$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0, len = arr.length;
      case 1:
        if (!(i < len)) {
          context$1$0.next = 7;
          break;
        }
        context$1$0.next = 4;
        return fn(arr[i], i);
      case 4:
        i++;
        context$1$0.next = 1;
        break;
      case 7:
      case "end":
        return context$1$0.stop();
    }
  }, forEach, this);
});

module.exports = forEach;