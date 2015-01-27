"use strict";

var map = regeneratorRuntime.mark( /**
                                    * @function
                                    *  @param {array} array - The array to iterate over
                                    *  @param {function} - The generator function
                                    *    usage: yield map(arr, fn) would return the resulting array asynchronously
                                    */
function map(arr, fn) {
  var result, i, len;
  return regeneratorRuntime.wrap(function map$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        result = [];
        i = 0, len = arr.length;
      case 2:
        if (!(i < len)) {
          context$1$0.next = 10;
          break;
        }
        context$1$0.next = 5;
        return fn(arr[i], i);
      case 5:
        context$1$0.t3 = context$1$0.sent;
        result.push(context$1$0.t3);

      case 7:
        i++;
        context$1$0.next = 2;
        break;
      case 10:
        return context$1$0.abrupt("return", result);
      case 11:
      case "end":
        return context$1$0.stop();
    }
  }, map, this);
});

module.exports = map;

//# sourceMappingURL=./co-map.js.map