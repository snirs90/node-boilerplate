'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace-task');

// CUSTOM MODULES.
var utils = require('../../utils');

/**
 * Compile config.js with the environment variables.
 */
gulp.task('config-stage', function () {
    return gulp.src('./config/config.js')
        .pipe(replace({
            patterns: [
                {
                    json: utils.parseJSONFile('./config/environments/stage.json')
                }
            ]
        }))
        .pipe(gulp.dest('./app/scripts/config/'));
});