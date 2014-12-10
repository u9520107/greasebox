import through from 'through2';
import recast from 'recast';
import traceur from 'traceur';
import applyMap from 'vinyl-sourcemaps-apply';

/**
 * @function nodeTransform
 *
 */
function nodeTransform() {
  return through.obj(function(file, enc, next) {
    try {
      if (file.isNull()) {
        return next();
      } else {
        var ast = recast.parse(file.contents.toString(enc), {
          sourceFileName: file.relative
        });
        var body = [];

        //remove css imports
        ast.program.body.forEach(function(part) {
          if (part.type === 'ImportDeclaration' &&
            part.source.value.match(/\.css!$/i)) {} else {
            body.push(part);
          }
        });
        ast.program.body = body;

        var output = recast.print(ast, {
          sourceMapName: file.relative
        });

        file.contents = new Buffer(output.code);
        if (file.sourceMap && output.map) {
          output.map.sourceRoot = file.buildStep;
          applyMap(file, output.map);

        }
        var tc = new traceur.Compiler({
          modules: 'commonjs',
          sourceMaps: 'file',
          generators: 'parse'
        });
        output = tc.compile(file.contents.toString(enc), file.relative, file.relative + '.map');
        file.contents = new Buffer(output);
        if (file.sourceMap) {
        var map = JSON.parse(tc.getSourceMap());
          map.sourceRoot = '@remove-css/';
          applyMap(file, map);
        }

        
        this.push(file);
        next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}

export default nodeTransform;
