import gulp from 'gulp';
import fs from 'fs-promise';
import path from 'path';
import cp from 'child_process';
import sember from 'semver';
import chalk from 'chalk';

gulp.task('publish', /*['build'],*/ async () => {
  let info = JSON.parse(cp.execSync('npm view --json greasebox'));
  let manifest = JSON.parse(await fs.readFile(path.resolve(__dirname, '../package.json')));

  info.versions = info.versions.filter((v) => {
    return semver.diff(manifest.version, v) === 'patch';
  }).sort(sortSemver);

  let latest = info.versions.pop();

  if(!latest || semver.gt(manifest.version, latest)) {
    await fs.writeFile(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(manifest, null, 2));
    console.log( await execSync('npm publish', {
      cwd: path.resolve(__dirname, '../dist')
    }));
  } else {
    console.log(`Trying to publish version: ${chalk.green( manifest.version )}, but latest npm version is ${chalk.green( latest )}.`);
  }
});

function sortSemver(a, b) {
   if(semver.gt(a, b)) {
     return 1;
   } else if(semver.lt(a, b)) {
     return -1;
   }
   return 0;
 }

