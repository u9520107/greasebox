import gulp from 'gulp';
import cofs from '../dist/cofs';
import path from 'path';
import co from 'co';
import exec from 'co-exec';
import semver from 'semver';
import chalk from 'chalk';

gulp.task('publish', ['build'], (cb) => {
  co(function * () {
    let info = JSON.parse(yield exec('npm view --json greasebox'));
    let manifest = JSON.parse(yield cofs.readFile(path.resolve(__dirname, '../package.json')));

    info.versions = info.versions.filter((v) => {
      return semver.diff(manifest.version, v) === 'patch';
    }).sort(sortSemver);


    let latest = info.versions.pop();

    if(semver.gt(manifest.version, latest)) {
      delete manifest.scripts.install;
      delete manifest.jspm.directories;
      manifest.jspm.registry = "jspm";
      yield cofs.writeFile(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(manifest, null, 2));
      console.log( yield exec('npm publish', {
        cwd: path.resolve(__dirname, '../dist')
      }));
    } else {
      console.log(`Trying to publish version: ${chalk.green( manifest.version )}, but latest npm version is ${chalk.green( latest )}.`);
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
