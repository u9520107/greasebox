import through from 'through2';
import cofs from 'co-fs';
import co from 'co';
import path from 'path';
import gutil from 'gulp-util';

function writeMap(root, ext) {
  if(!ext) {
    ext = '.map';
  }
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      return next();
    } else if(file.sourceMap){
      var sourceRoot = root ? root : file.sourceMap.sourceRoot;

      //replace
      if(sourceRoot !== file.sourceMap.sourceRoot) {
        var nameCheck = new RegExp('^' + escapeRegExp(sourceRoot));
        file.sourceMap.sources = file.sourceMap.sources.map(function (name) {
          if(name[0] !== '/' && name[0] !== '@') {
            return file.sourceMap.sourceRoot + name; 
          }else if(name.match(nameCheck)) {
            return name.substring(sourceRoot.length);
          } else {
            return name;
          }
        
        });
        file.sourceMap.sourceRoot = sourceRoot;
      }

      var mapFile = new gutil.File({
        base: file.base,
        cwd: file.cwd,
        path: file.path + ext,
        contents: new Buffer(JSON.stringify(file.sourceMap))
      });
      this.push(file);
      this.push(mapFile);
    } else {
      this.push(file);
    }
    next();
  });

}

/**
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
function escapeRegExp(string){
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}

export default writeMap;
