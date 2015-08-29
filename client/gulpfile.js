'use strict';

// "dist" tasks and build processes.
require('./gulp-tasks/dist/tasks.js');
require('./gulp-tasks/dist/build.js');

// "dev" environment tasks & builds processes.
require('./gulp-tasks/env/dev/tasks.js');
require('./gulp-tasks/env/dev/build.js');

// "stage" environment tasks & builds processes.
require('./gulp-tasks/env/stage/tasks.js');
require('./gulp-tasks/env/stage/build.js');