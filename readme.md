# object-information

<a href='https://www.npmjs.com/package/object-information'>
    <img src='https://img.shields.io/npm/v/object-information.svg?link=https://www.npmjs.com/package/object-information&?link=https://www.npmjs.com/package/object-information' alt='NPM Version' /> 
</a> <a href='https://npm-stat.com/charts.html?package=object-information'>
    <img src='https://img.shields.io/npm/dt/object-information.svg' alt='NPM Downloads'/>
</a> <a href='https://opensource.org/licenses/MIT'>
    <img src='https://img.shields.io/npm/l/object-information.svg' alt='License MIT'/>
</a> <a href='https://david-dm.org/JKerney-HunterIndustries/object-information'>
    <img src='https://david-dm.org/JKerney-HunterIndustries/object-information.svg' alt='Dependencies' />
</a>

**What?**

Object Information is a library that returns a formatted string with informarion about what an object contains.

**Why?**

This was developed to give better results when combined with approval tests. _JSON.stringify_ by itself does not give enough information.

I wanted something that could handle functions, <a href='https://www.npmjs.com/package/signet'>signet</a> signatures, and errors within the output.

____

## asInformationString

The 'asInformationString' method, takes an object and returns the most detailed string.

```JavaScript
const { asInformationString } = require('object-information');

const enforcedFunction = signet.enforce(
            'a:number, b:int => number',
            function enforcedFunction(a, b) {
                return a * b;
            }
        );

const testObject = {
            'a String property': 'this is a string',
            'an error property': new Error('this is an error'),
            'a number property': 42,
            'an enforced function': enforcedFunction,
            'an array property': ['life', 'universe', 'everything', 42],
        };

const informationString = asInformationString(testObject);
```

The variable 'inforamtionString' contains:

```JavaScript
`{
    "a String property": "this is a string",
    "an error property": "Error: this is an error",
    "a number property": 42,
    "an enforced function": "Function: enforceDecorator [a:number, b:int => number]",
    "an array property": [
        "life",
        "universe",
        "everything",
        42
    ]
}`
```

---

## asBasicInformationString

The method 'asBasicInformationString' removes the function signatures.

```JavaScript
`{
    "a String property": "this is a string",
    "an error property": "Error: this is an error",
    "a number property": 42,
    "an enforced function": "Function: enforceDecorator",
    "an array property": [
        "life",
        "universe",
        "everything",
        42
    ]
}`
```

---

## asFormattedJsonString

The method 'asFormattedJsonString' is just a wrapper arround ```JSON.stringify(value, null, 4);```.

```JavaScript
`{
    "a String property": "this is a string",
    "an error property": {},
    "a number property": 42,
    "an array property": [
        "life",
        "universe",
        "everything",
        42
    ]
}`
```

---

## asJsonString

The method 'asJsonString' allows you to determine the indent.

The call ```asJsonString(testObject, 2);``` returns:

```JavaScript
`{
  "a String property": "this is a string",
  "an error property": {},
  "a number property": 42,
  "an array property": [
    "life",
    "universe",
    "everything",
    42
  ]
}`
```

Where as the call ```sJsonString(testObject);``` returns:

```JavaScript
'{"a String property":"this is a string","an error property":{},"a number property":42,"an array property":["life","universe","everything",42]}'
```

## asGridString

The method 'asGridString' takes in an array of arrays, and then prints returns it as a grid.

```JavaScript
const data = [
    [1, 2, null],
    [4, undefined, 5],
    [6, { property: 7 }, 8]
];

asGridString(data);
```

This call returns:

```
.......1........|.......2........|......null......
.......4........|.."undefined"...|.......5........
.......6........|.{"property":7}.|.......8........
```