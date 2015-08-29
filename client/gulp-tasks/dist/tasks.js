'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var replace = require('gulp-replace-task');
var minifyCss = require('gulp-minify-css');

var del = require('del');

var utils = require('../utils');

/**
 * Clean the dist folder.
 */
gulp.task('clean-dist', function (cb) {
    del([
        './dist/**/*'
    ], cb);
});

/**
 * Compile scripts & css and copy them into the "dist" folder.
 */

gulp.task('assets', ['clean-dist'], function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            vendorjs: [uglify(), rev()],
            js: [uglify(), rev()],
            cssvendor: [minifyCss({compatibility: 'ie8'}), rev()],
            css: [sass({outputStyle: 'compressed'}).on('error', sass.logError), rev()]
        }))
        .pipe(gulp.dest('./dist'));
});

/**
 * Copy the "views" into "dist "folder.
 */
gulp.task('views-copy', ['clean-dist'], function () {
    return gulp.src('./app/views/**')
        .pipe(gulp.dest('./dist/views'));
});