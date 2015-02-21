import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import cp from 'child_process';
import chalk from 'chalk';

const taskFile = /^[A-Za-z].*\.js$/i;

export default function gulpstrap (){
  if(process.execArgv.indexOf('--harmony') > -1 || process.execPath.match(/iojs/)) {
    require('babel/register');
    let dirname = process.cwd();
    if(process.platform === 'win32') {
      dirname = dirname[0].toLowerCase() + dirname.slice(1);
    }
    fs.readdirSync('gulp-tasks').forEach(function(task) {
      if(/^[A-Za-z].*\.js$/i.test(task)) {
        require(path.resolve(dirname, 'gulp-tasks', task));
      }
    });

  } else {
    fs.readdirSync('gulp-tasks').forEach(function (task) {
      if(/^[A-Za-z].*\.js$/i.test(task)) {
        gulp.task(path.basename(task, '.js'), delegate);
      }
    });
  }
}

function delegate(cb) {
  var handler = handleProcessExit.bind(this, cb);
  console.log(chalk.red('delegate task to harmony runner'));
  cp.spawn('node', ['--harmony', 'node_modules/gulp/bin/gulp', process.argv[2]], {
    stdio: 'inherit'
  }).on('exit', handler)
    .on('error', handler);
}
function handleProcessExit(cb, err) {
  console.log(chalk.red('delegate task completed'));
  cb(err);
}
