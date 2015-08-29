'use strict';

var gulp = require('gulp');
var del = require('del');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var replace = require('gulp-replace-task');

// CUSTOM MODULES.
var utils = require('../../utils');

/**
 * Clean the .tmp folder.
 */
gulp.task('clean-tmp', function (cb) {
    del([
        './.tmp/**/*'
    ], cb);
});

/**
 * Compile sass files and copty them into ".tmp" folder.
 */
gulp.task('sass-dev', ['clean-tmp'], function () {
    return gulp.src('./app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./.tmp/styles'));
});

/**
 * Watch the SASS files.
 */
gulp.task('sass:watch', function () {
    return gulp.watch('./app/styles/**/*.scss', ['sass-dev']);
});

/**
 * Compile config.js with the environment variables.
 */
gulp.task('config-dev', function () {
    return gulp.src('./config/config.js')
        .pipe(replace({
            patterns: [
                {
                    json: utils.parseJSONFile('./config/environments/dev.json')
                }
            ]
        }))
        .pipe(gulp.dest('./app/scripts/config/'));
});