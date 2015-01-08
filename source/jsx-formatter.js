import through from 'through2';
import esp from 'esprima-fb';
import cofs from './cofs';
import esc from 'escodegen-jsx';

const DEFAULT_FORMATTER_OPTIONS = {
  indent: {
    style: ' ',
    base: 0
  }
};


function jsxFormatter (options) {
  return through.obj(function (file, enc, next) {
    var src = file.contents.toString(enc);
    try {
      var ast = esp.parse(src, {
        range: true,
        comment: true,
        tokens: true
      });

      ast = esc.attachComments(ast, ast.comments, ast.tokens);

      var output = esc.generate(ast, {
        format: {
          indent: {
            style: '  ',
            base: 0
          }
        },
        comment: true
      });
      file.contents = new Buffer(output);
      this.push(file);
      next();

    } catch(err) {
      next(err);
    }
  });
}


export default jsxFormatter;
