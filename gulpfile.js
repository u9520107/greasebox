var gulp = require('gulp');
var cp = require('child_process');
var path = require('path');
var fs = require('fs');

var isHarmony = process.execArgv.indexOf('--harmony') > -1;

//load tasks if harmony flag is on
if(isHarmony && fs.existsSync('gulp-tasks')) {
  fs.readdirSync('gulp-tasks').forEach(function(task) {
    if(/^[A-za-z].*\.js$/i.test(task)) {
      require(path.resolve(__dirname, 'gulp-tasks', task));
    }
  });
}

gulp.task('build', (isHarmony ? ['harmony:build'] : []), function () {
  if(!isHarmony) {
    spawnTask('build');
  }
});

gulp.task('test', (isHarmony ? ['harmony:test'] : []), function (cb) {
  if(!isHarmony) {
    spawnTask('test');
  }
});


function spawnTask(task) {
  return cp.spawn('node', ['--harmony', 'node_modules/gulp/bin/gulp.js', task], {
    stdio: 'inherit'
  });
}
