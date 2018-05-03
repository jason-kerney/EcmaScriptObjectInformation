'use strict';

describe('objectInformation', function () {
    const container = require('../djectContainer');
    const toolsContainer = require('./toolsContainer');

    toolsContainer.build('approvalsConfig')();

    const signet = toolsContainer.build('signet');

    let objectInformation;

    let testObject;

    beforeEach(function () {
        const testContainer = container.new();


        const enforcedFunction = signet.enforce(
            'a:number, b:int => number',
            function enforcedFunction(a, b) {
                return a * b;
            }
        );

        function notEnforcedFunction(a, b) {
            return a * b;
        }

        testObject = {
            'a String property': 'this is a string',
            'an error property': new Error('this is an error'),
            'a number property': 42,
            'an enforced function': enforcedFunction,
            'a function who is not enforced': notEnforcedFunction,
            'an anonymous function': (a, b) => a + b,
            'an array property': ['life', 'universe', 'everything', 42],
        };

        objectInformation = testContainer.build('objectInformation');
    });

    it('asJsonString', function () {
        this.verify(objectInformation.asJsonString(testObject));
    });

    it('asJsonString with indent', function () {
        this.verify(objectInformation.asJsonString(testObject, 2));
    });

    it('asFormattedJsonString', function () {
        this.verify(objectInformation.asFormattedJsonString(testObject));
    });

    it('asBasicInformationString', function () {
        this.verify(objectInformation.asBasicInformationString(testObject));
    });

    it('asInformationString', function () {
        this.verify(objectInformation.asInformationString(testObject));
    });
});