# JS / Algo
## Local Storage and Error Handling

*Pre-requisites: lesson 7*

*ECV Digital - 10/12/2015*

---
## Web storage
Every browsers give you access to [web storage capacities](https://en.wikipedia.org/wiki/Web_storage).

It is called localStorage and give you access to a [**`Storage`** object](https://developer.mozilla.org/en-US/docs/Web/API/Storage) which works as a [**`key-value`** store](https://en.wikipedia.org/wiki/Key-value_database)

The most interesting part is the fact that data stored in [**`localStorage`**](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) has no expiration time!

> Those information will be kept event if you close the browser

--
## Serialization
You can **only store strings** in the local storage so we have to transform any kind of data into a string.

More globally the idea of transforming data to store it or transmit it is called [serialization](https://en.wikipedia.org/wiki/Serialization)

In JS we can use the [JSON format](https://en.wikipedia.org/wiki/JSON) to achieve serialization

```javascript
// Converting data into strings
var data = {
  a: 1,
  b: [2, 3],
  c: {inner: "hop"}
};
var json = JSON.stringify(data);
console.log(json); // → {"a":1,"b":[2,3],"c":{"inner":"hop"}}

// Parsing it back
console.log(JSON.parse(json)); // → Object {a: 1, b: Array[2], c: Object}
```

--
## Storing/retrieving data
Browsers provides you an API to access the storage system:
```javascript
//Setting a value
localStorage.colorSetting = '#a4509b';
localStorage['colorSetting'] = '#a4509b';
localStorage.setItem('colorSetting', '#a4509b');

// Getting a value
console.log(localStorage.colorSetting); // → '#a4509b'
console.log(localStorage['colorSetting']); // → '#a4509b'
console.log(localStorage.getItem('colorSetting')); // → '#a4509b'
```

Other limitation:
- The localStorage is bind to websites (You can't share data between domains)
- Storage space is [limited](http://stackoverflow.com/questions/2989284/what-is-the-max-size-of-localstorage-values)

--
## Exercice
Access any website you want and store something in the localstorage. Close your browser, open it again and check that you can still have access to the value.

---
## Error: Food for the mind
**Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it**

Author: **Brian Kernighan** and *P.J. Plauger*, The Elements of Programming Style

Taken directly from the [online javascript eloquent book](http://eloquentjavascript.net/08_error.html)

> Don't try to show off your personall skils while coding or you won't be smart enough to solve your own bugs

---
## Strict mode
JS can be made stricter by enabling **strict mode** by putting the string "use strict" at the top of a file or a function body:

```javascript
function canYouSpotTheProblem() {
  "use strict"; // The tag is function scoped
  for (counter = 0; counter < 10; counter++)
    console.log("Happy happy");
}
canYouSpotTheProblem(); // → ReferenceError: counter is not defined
```
Normally, when you forget to put `var` in front of an undefined variable, JavaScript creates a global variable (hoisting) and uses that

In strict mode: **an error is reported instead**

--
## Strict mode
`Strict mode` si more strict, which is better as it avoid common pitafalls in the language.

> Conclusion: Put a `"use strict"` at the top of your files

---
## Testing
When the language doesn't help you find mistakes, you have to find them by running the program and checking the result.

This way of doing is call testing:

```javascript
function createObj(val1, val2){
  return {
    a: val1,
    b: val2
  }
}
function testVector() {
  var obj = createObj(10, 20);

  if (obj.a !== 10) return "fail: a property";
  if (obj.b !== 20) return "fail: b property";
  return "everything ok";
}
console.log(testVector()); // → everything ok
```

--
## Advantages of test
- It helps you [avoid regression](https://en.wikipedia.org/wiki/Software_regression)
- It helps you repeat "a process to check a feature" faster and automatically
- It helps you be more serene when you ship!

One way to write very valuable tests is to write them each time you have to reproduce a bug and then fix the bug (and so validate the test).

This is called [regression testing](https://en.wikipedia.org/wiki/Regression_testing)

---
## Exceptions
When a function encounter an error, we want to jump immediately to a place that knows how to handle the problem. This is what exception handling does.

```javascript
function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "There is a dungeon";
  if (result.toLowerCase() == "right") return "There is a farm";
  throw new Error("Invalid direction, " + result); // "raise" an exception
}

try {
  console.log("Look!", promptDirection());
} catch (error) { // "catch" an exception
  console.log("" + error); // Error: Invalid direction, test
}
```

--
## The finally keyword
Exceptions block the programs at the same line of the `throw` statement

```javascript
var context = null;
function withContext(newContext, body) {
  var oldContext = context;
  context = newContext;
  // Executed
  var result = body(); // Throw an error
  //Not executed, the previous context is lost forever
  context = oldContext;
  return result;
}
```
In this case, you can't continue running your program becaute it won't **recover** from the error

--
## The finally keyword
Try statements may be followed by a finally block which means “No matter what happens, run this code after trying to run the code in the try block”. a finally block.

```javascript
function withContext(newContext, body) {
  var oldContext = context;
  context = newContext;
  // Executed
  try {
    return body();
  } finally {
    // Executed, even with the return statement
    context = oldContext;
  }
}

```
Even if we return directly from the try block, the finally block will be run. 

--
## Selective catching

When an exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment. 

When a catch body is entered, all we know is that something in our try body caused an exception. But we don’t know what, or which exception it caused.

JavaScript (in a rather glaring omission) doesn’t provide direct support for selectively catching exceptions: either you catch them all or you don’t catch any.

We can simulate it by checking in the catch block whether the exception we got is the one we are interested in.

We could match its message property against the error message we happen to expect but that’s a shaky way.

--
### Sneak peak into prototypes
Let’s define a new type of error!

```javascript
function InputError(message) {
  this.message = message;
  this.stack = (new Error()).stack; // We access the current context stack
}
InputError.prototype = Object.create(Error.prototype); // Copy Error prototype
InputError.prototype.name = "InputError"; // Attribute a new name
```

```javascript
function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "There is a dungeon";
  if (result.toLowerCase() == "right") return "There is a farm";
  throw new InputError("Invalid direction: " + result);
}

for (;;) {
  try {
    console.log("Look!", promptDirection("Where?"));
    break; // break the loop 
  } catch (e) {
    if (e instanceof InputError) // Checking `e` instance type
      console.log("Not a valid direction. Try again.");
    else
      throw e; // If it's not a known error, we throw it again
  }
}
```

--
## Assertions
Assertions are a way to make sure mistakes cause failures at the point of the mistake, rather than silently producing nonsense values that may go on to cause trouble in an unrelated part of the system.

```
function AssertionFailed(message) {
  this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
  if (!test) // We can have the current state of the program now
    throw new AssertionFailed(message); 
}

function lastElement(array) {
  assert(array.length > 0, "empty array in lastElement");
  return array[array.length - 1];
}
```

--
## Exercises

- You have a function primitiveMultiply
- In 50 percent of cases, it multiplies two numbers
- In the other 50 percent, it raises an exception of type MultiplicatorUnitFailure.

Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.

```javascript
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  // Your code here.
}

console.log(reliableMultiply(8, 8)); // → 64
```

---
# Project: A Todo list
> 
- Add the localStorage to keep track of the todolist
- Add the capacity to filter tasks based on their status