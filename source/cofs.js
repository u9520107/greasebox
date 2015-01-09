import thunkify from 'thunkify';
import fs from 'fs';
import coStream from './co-stream';
/**
 *  cofs module derives from tj/co-fs.
 */
var methods = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile'
];
var cofs = {};
methods.forEach(function (name) {
  if (fs[name]) {
    cofs[name] = thunkify(fs[name]);
  }
});
cofs.exists = function (path) {
  return function (done) {
    fs.stat(path, function (err, res) {
      done(null, !err);
    });
  };
};
cofs.createReadStream = function () {
  return coStream(fs.createReadStream.apply(null, arguments));
};
export default cofs;
