'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

/**
 * Create a local server and serves the dist folder.
 */
gulp.task('serve-dist', function () {
    connect.server({
        root: ['dist'],
        port: 5510,
        host: 'localhost',
        fallback: './dist/index.html'
    });
});