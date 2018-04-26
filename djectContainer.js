'use strict';

const path = require('path');

var config = {
    cwd: path.join(__dirname, 'app'),
    modulePaths: [
        '',
    ],
    allowOverride: true,
    eagerLoad: false
};

module.exports = require('dject').new(config);