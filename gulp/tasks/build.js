var gulp          = require('gulp');
var isProduction  = require('../util/isProduction');
var sequence      = require('run-sequence');

gulp.task('build', function(done) {
  if(isProduction) {
    sequence('clean', ['sass', 'javascript-first', 'javascript'], 'jekyll-build', 'rev:collect', done);
  } else {
    sequence('clean', ['sass', 'javascript-first', 'javascript'], 'jekyll-build', done);
  }
});
