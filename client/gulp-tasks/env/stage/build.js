'use strict';

'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

/**
 * Build task for "stage" environment.
 */
gulp.task('build-stage', ['clean-dist', 'config-stage', 'assets', 'views-copy']);

/**
 * Run the "build-stage" task, creates a local server and serves the dist folder.
 */
gulp.task('serve-stage', ['build-stage'], function () {
    connect.server({
        root: ['dist'],
        port: 5510,
        host: 'localhost',
        fallback: './dist/index.html'
    });
});