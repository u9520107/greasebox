import gulp from 'gulp';
import cofs from '../dist/cofs';
import path from 'path';
import co from 'co';
import exec from 'co-exec';
import semver from 'semver';
import chalk from 'chalk';
import debug from 'debug';
debug.enable('publish-log');
const log = debug('publish-log');

gulp.task('publish', ['build'], (cb) => {
  co(function * () {
    let info = JSON.parse(yield exec('npm view --json greasebox'));
    info.versions.sort(sortSemver);
    let latest = info.versions.pop();

    let manifest = JSON.parse(yield cofs.readFile(path.resolve(__dirname, '../package.json')));
    if(semver.gt(manifest.version, latest)) {
      delete manifest.scripts.install;
      delete manifest.jspm.directories;
      manifest.jspm.registry = "jspm";
      yield cofs.writeFile(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(manifest, null, 2));
      log( yield exec('npm publish', {
        cwd: path.resolve(__dirname, '../dist')
      }));
    } else {
      log(`Trying to publish version: ${chalk.green( manifest.version )}, but latest npm version is ${chalk.green( latest )}.`);
    }

  }).then(cb)
    .catch(cb);
});

function sortSemver(a, b) {
  if(semver.gt(a, b)) {
    return 1;
  } else if(semver.lt(a, b)) {
    return -1;
  }
  return 0;
}
