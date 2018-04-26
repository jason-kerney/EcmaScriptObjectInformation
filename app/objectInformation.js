'use strict';

function objectInformation() {
    function getFunctionName(value, showSignature) {
        let functionName = value.name === '' ? 'anonymous function' : value.name;
        let functionSignature = Boolean(value.signature) ? ` [${value.signature}]` : ' [* => *]';
        functionSignature = showSignature ? functionSignature : '';

        return `Function: ${functionName}${functionSignature}`;
    }

    function functionToName(value, showSignature) {
        return typeof value === 'function' ? getFunctionName(value, showSignature) : value;
    }

    function preprocessValues(showSignature) {
        return function (key, value) {
            return functionToName(value, showSignature);
        };
    }

    function asInformationStringWithRegardForSignature(value, showSignature) {
        return JSON.stringify(value, preprocessValues(showSignature), 4);
    }

    function asInformationString(value) {
        return asInformationStringWithRegardForSignature(value, true);
    }

    function asBasicInformationString(value) {
        return asInformationStringWithRegardForSignature(value, false);
    }

    function asJsonString(value, indent) {
        return JSON.stringify(value, null, indent);
    }

    function asFormattedJsonString(value) {
        return asJsonString(value, 4);
    }

    return {
        asJsonString,
        asFormattedJsonString,
        asBasicInformationString,
        asInformationString,
    };
}

module.exports = objectInformation;