var path = require('path');
var fs = require('fs');
var to5 = require('6to5');

to5.register();
fs.readdirSync('gulp-tasks').forEach(function(task) {
  if(/^[A-za-z].*\.js$/i.test(task)) {
    require(path.resolve(__dirname, 'gulp-tasks', task));
  }
});

