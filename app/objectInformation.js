'use strict';

function objectInformation(
    signet
) {
    function getFunctionName(value, showSignature) {
        let functionName = value.name === '' ? 'anonymous function' : value.name;
        let functionSignature = Boolean(value.signature) ? ` [${value.signature}]` : '';
        functionSignature = showSignature ? functionSignature : '';

        return `Function: ${functionName}${functionSignature}`;
    }

    function getStringifiableValue(value, showSignature) {
        if (signet.isTypeOf('function')(value)) {
            return getFunctionName(value, showSignature);
        } else if (signet.isTypeOf('error')(value)) {
            return value.toString();
        } else if (signet.isTypeOf('undefined')(value)) {
            return 'undefined';
        } else {
            return value;
        }
    }

    function preprocessValues(showSignature) {
        return function (key, value) {
            return getStringifiableValue(value, showSignature);
        };
    }

    function asInformationStringWithRegardForSignature(value, showSignature) {
        return JSON.stringify(value, preprocessValues(showSignature), 4);
    }
    
    function asFlatInformationString(value, showSignature) {
        return JSON.stringify(value, preprocessValues(showSignature), null);
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

    function asGridString(data) {
        const stringData = (
            data
                .map(function (row) {
                    return (
                        row
                            .map(datum => asFlatInformationString(datum, null))
                    );
                })
        );

        const maxLength = (
            stringData
                .reduce(
                    function (previousRowValue, row) {
                        return (
                            row
                                .reduce(function (previousValue, datum) {
                                    return (previousValue < (datum.length)) ? datum.length : previousValue;
                                }, previousRowValue)
                        );
                    }
                    , 0
                ) + 2
        );

        const paddedData = (
            stringData
                .map(function (row) {
                    return (
                        row
                            .map(function (datum) {
                                const length = datum.length;
                                const lengthDiff = maxLength - length;

                                const basicPadding = Math.floor(lengthDiff / 2);
                                const remainder = lengthDiff - (2 * basicPadding);

                                const frontPadding = ''.padStart(basicPadding, '.');
                                const backPadding = ''.padStart(basicPadding + remainder, '.');

                                return `${frontPadding}${datum}${backPadding}`;
                            })
                    );
                })
        );

        const rowData = (
            paddedData
                .map(row => row.join('|'))
        );

        return rowData.join('\n');
    }

    return {
        asJsonString,
        asFormattedJsonString,
        asBasicInformationString,
        asInformationString,
        asGridString: signet.enforce(
            'data:array<array> => string',
            asGridString
        ),
    };
}

module.exports = objectInformation;