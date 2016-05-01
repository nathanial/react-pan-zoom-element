var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var preprocess = require('gulp-preprocess');

gulp.task('dist', function(){
  var babelConfig = {
    stage: 0,
    optional: [],
    sourceMaps: 'inline'
  }
  var sourcemapInit = {loadMaps: true};
  var sourcemapWrite = {};
  return merge(
    gulp.src(['src/**/*.js'])
        .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
        .pipe(babel(babelConfig))
        .pipe(gulp.dest('build')),
    gulp.src('src/**/*.jsx')
        .pipe(babel(babelConfig))
        .pipe(gulp.dest('build')),
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build')),
    gulp.src('src/images/**/*', {base: 'src'})
        .pipe(gulp.dest('build')),
    gulp.src('src/**/*.less').pipe(less({
      paths: [
       './src'
     ]
    })).pipe(gulp.dest('build'))
  );
});
