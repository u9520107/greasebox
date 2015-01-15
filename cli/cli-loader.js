#!/usr/bin/env node

"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var traceur = _interopRequire(require("traceur"));

require(traceur.RUNTIME_PATH);
var cli = _interopRequire(require("./cli"));