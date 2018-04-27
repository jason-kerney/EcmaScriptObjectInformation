function signet() {
    'use strict';
    const typeHelper = require('signet')();
    
    typeHelper.subtype('object')('error', function (value) {
        return Object.prototype.toString.apply(value) === '[object Error]';
    });

    return typeHelper;
}

module.exports = signet;