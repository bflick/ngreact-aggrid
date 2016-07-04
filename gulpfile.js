const gulp = require('gulp'),
      buildConfig = require('./config/default.js'),
      gutil = require('gulp-util'),
      concat = require('gulp-concat'),
      argv = require('minimist')(process.argv.slice(2)),
      footer = require('gulp-footer'),
      header = require('gulp-header'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename');
//const sourcemaps = require('gulp-sourcemaps'),
const webpack = require('webpack'),
      gulpWebpack = require('gulp-webpack'),
      watch = require('gulp-watch'),
      gridConfig = require('./webpack.grid');



gulp.task('build', () =>
          gulp.src(buildConfig.source)
          .pipe(gulpWebpack(gridConfig, webpack))
          .pipe(gulp.dest(buildConfig.destDir))
);

gulp.task('watch', ['build'], function () {
  gulp.watch([buildConfig.source], ['build']);
});

gulp.task('default', ['build']);
