'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

/**
 * Serve a local server and serves the "app" folder.
 */
gulp.task('serve', ['clean-tmp', 'sass-dev', 'sass:watch', 'config-dev'], function () {
    connect.server({
        root: ['app', '.tmp'],
        port: 5510,
        host: 'localhost',
        fallback: './app/index.html'
    });
});

/**
 * Build task for "dev" environment.
 */
gulp.task('build-dev', ['clean-dist', 'config-dev', 'assets', 'views-copy']);

/**
 * Run the "build-dev" task, creates a local server and serves the dist folder.
 */
gulp.task('serve-dev', ['build-dev'], function () {
    connect.server({
        root: ['dist'],
        port: 5510,
        host: 'localhost',
        fallback: './dist/index.html'
    });
});