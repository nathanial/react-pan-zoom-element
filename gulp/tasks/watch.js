var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var electron = require('electron-connect').server.create();

gulp.task('watch', ['build'], function(){
    // Start browser process
  electron.start();
  gulp.watch('src/**/*.*', ['build', electron.reload]);
});
