"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__through2__,
    $__esprima_45_fb__,
    $__cofs__,
    $__escodegen_45_jsx__;
var through = ($__through2__ = require("through2"), $__through2__ && $__through2__.__esModule && $__through2__ || {default: $__through2__}).default;
var esp = ($__esprima_45_fb__ = require("esprima-fb"), $__esprima_45_fb__ && $__esprima_45_fb__.__esModule && $__esprima_45_fb__ || {default: $__esprima_45_fb__}).default;
var cofs = ($__cofs__ = require("./cofs"), $__cofs__ && $__cofs__.__esModule && $__cofs__ || {default: $__cofs__}).default;
var esc = ($__escodegen_45_jsx__ = require("escodegen-jsx"), $__escodegen_45_jsx__ && $__escodegen_45_jsx__.__esModule && $__escodegen_45_jsx__ || {default: $__escodegen_45_jsx__}).default;
var DEFAULT_FORMATTER_OPTIONS = {indent: {
    style: ' ',
    base: 0
  }};
function jsxFormatter(options) {
  return through.obj(function(file, enc, next) {
    var src = file.contents.toString(enc);
    try {
      var ast = esp.parse(src, {
        range: true,
        comment: true,
        tokens: true
      });
      ast = esc.attachComments(ast, ast.comments, ast.tokens);
      var output = esc.generate(ast, {
        format: {indent: {
            style: '  ',
            base: 0
          }},
        comment: true
      });
      file.contents = new Buffer(output);
      this.push(file);
      next();
    } catch (err) {
      next(err);
    }
  });
}
var $__default = jsxFormatter;

//# sourceMappingURL=jsx-formatter.js.map
//# sourceURL=jsx-formatter.js