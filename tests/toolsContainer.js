'use strict';

var config = {
    cwd: __dirname,
    modulePaths: [
        '',
        'test-utilities',
        '../app',
    ],
    allowOverride: true,
    eagerLoad: false
};

module.exports = require('dject').new(config);