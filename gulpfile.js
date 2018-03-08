'use strict';

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  util = require('gulp-util'),
  csso = require('gulp-csso'),


// Mimify Css files
gulp.task('mimifyAppCss', function() {
  return gulp.src('css/app.css')
  .pipe(maps.init())
  .pipe(csso())
  .pipe(maps.write('./'))
  .pipe(rename('app.min.css'))
  .pipe(gulp.dest('css'));
});

gulp.task('mimifyBootpCss', function() {
  return gulp.src('css/bootstrap.css')
  .pipe(maps.init())
  .pipe(csso())
  .pipe(maps.write('./'))
  .pipe(rename('bootstrap.min.css'))
  .pipe(gulp.dest('css'));
});


gulp.task('build', ['mimifyScripts', 'mimifyAppCss', 'mimifyBootpCss'], function() {
  return gulp.src(["css/app.min.css", "css/bootstrap.min.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], { base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch(["./*.html", "css/*.css"]).on('change', browserSync.reload);
});

gulp.task("default", ['serve'], function() {
  gulp.start('build');
});