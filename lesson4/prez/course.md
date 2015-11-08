# JS / Algo
## Understanding functions and scope

*Pre-requisites: lesson 3*

*ECV Digital - 05/11/2015*

---
# Setting up

Set up your environment:
- Pull your own repo and the teacher's repo. 
- Move into the lesson4 exercice folder 
- Create a folder with your name, move into it
- Add an `entry.js`, `index.html` and `webpack.config.js` file
- Add a `app.js` file

---
# Functions
Different kind of functions in the JS world:
- Synchrone (blocking functions)
- Asynchrone (non-blocking functions)

Different way to define them:
- Named function
- Anonymous function

--
# Default behavior
*Beware: by default, without any return statement, they will return `undefined`*
```javascript
function test(){}
console.log(test());
```
**Display `undefined`** 

Be carefull this is not always the case:
- PHP return `null`
- Ruby returns the last evaluated expression

Note: Open the crome console and check that a JS function doesn't any return statement to actually return something


---
# Different kinds
## Sync. functions
```javascript
var a = 0;
function increment(a){
  a++;
  return a;
}
a = increment(a); // JS stick here until the processing ends
console.log(a);
```
**Display `1`** <!-- .element: class="fragment" -->

Sync. functions **block** the execution of the program while they process data. 

<!-- .element: class="fragment" -->

--
## Async. functions
```javascript
var a = 0;
function asyncIncrement(a){
  setTimeout(function(){
    a++;
  }, 0); // This has the effect of delaying the processing for the next tick
  return a;
}
a = asyncIncrement(a); // JS doesn't stick here until the processing ends
console.log(a);
```
**Display `0`** <!-- .element: class="fragment" -->

Async. functions **don't block** the execution of the program while they process data

<!-- .element: class="fragment" -->

That has a very big impact on your program flow: you can't return any relevant result with the `return` statement of your function

<!-- .element: class="fragment" -->

--
# Callback ?
With an async. function, you want your code to be called again when the processing actually return something.

The only way to do that is to give, as an argument, a function which will be called at the end of your async. function.

> This function is call a **callback**

--
# Exercice

> transform the precedent example to handle a callback

```javascript
var a = 0;
function asyncIncrement(a, callback){
  setTimeout(function(){
    a++;
    callback(a);
  }, 0);
  // return a;
}
// a = increment(a);
// console.log(a);
asyncIncrement(a, console.log);
```

<!-- .element: class="fragment" -->
**Display `1`** <!-- .element: class="fragment" -->

--
# Best practice
- The callback function should always be the last argument
- In the NodeJS world
  - You don't throw errors
  - Instead the first argument of a callback must be an error object

```javascript
function myFunction(someArray, callback){
    if( !Array.isArray(someArray) ){
        var err = new TypeError('someArray must be an array');
        callback(err, null);
        return; // Don't forget to stop the execution
    }
    callback(null, someArray);
}
function myCallback(error, datum1, datum2) {}
```
--
# arguments
```javascript
function logMyName(){
  console.log(arguments);
}
```
 - It is a "magic" local **object** for every functions in javascript. 
 - It contains many among among which you can find all the arguments of the function for example


---
# Different ways
## Named func. expression (NFE)
```javascript
function logMyName(){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  console.log("My name is " + name);
}
logMyName();
```
**Display: `My name is logMyName`** <!-- .element: class="fragment" -->

> This is a function declaration

<!-- .element: class="fragment" -->


[NFE Demystified](http://kangax.github.io/nfe/) <!-- .element: target="_blank" -->

--
## Anonymous func.
```javascript
var logMyName2 = function (){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  console.log("My name is " + name);
}
logMyName2();
```
**Display: `My name is `** <!-- .element: class="fragment" -->

> This is a function expression

<!-- .element: class="fragment" -->

--
# Hoisting!

function declaration and function expression are not evaluated the same way by the compiler.
- Function declaration (as variable declaration) are hoisted
- Function expression (as variable assignation) are not hoisted

> To hoist: hisser ...

--
## A few examples
Do you think those function calls are valid ?

```javascript
// Your code:
bar();
function bar() {}
```
> bar(): Yes!

<!-- .element: class="fragment" -->
Here is what the compiler actually do after hoisting the function declaration

<!-- .element: class="fragment" -->

```javascript
// The compiler code:
function bar() {}
bar();
```
<!-- .element: class="fragment" -->

--
```javascript
// Your code:
foo();
var foo = function() {}
```
> foo(): No!

<!-- .element: class="fragment" -->

```javascript
// The compiler code:
var foo;
foo();
foo = function() {}
```
<!-- .element: class="fragment" -->

--
```javascript
// Your code:
bar();
function bar() {
    foo();
}
var foo = function() {}
```
> bar(): Yes! - foo(): No!

<!-- .element: class="fragment" -->

```javascript
// The compiler code:
var foo;
function bar() {
    foo();
}
bar();
foo = function() {}
```
<!-- .element: class="fragment" -->

--
```javascript
// Your code:
bar();
function bar() {
    foo();
}
function foo() {}
```
> bar(): Yes! - foo(): Yes!

<!-- .element: class="fragment" -->
```javascript
// The compiler code:
function bar() {
    foo();
}
function foo() {}
bar();
```
<!-- .element: class="fragment" -->

Source: http://stackoverflow.com/questions/7609276/javascript-function-order-why-does-it-matter

<!-- .element: class="fragment" -->

---
# Full example! 
#### Immediately-Invoked Function Expression (IIFE)
```javascript
var outsideName = (function (){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  setTimeout(function(){
    name = "fakeName";
    console.log("My name is " + name);
  }, 0);
  return name;
})()
console.log("outsideName is " + outsideName);
```

--
Remarks:
- This is an anonymous function
- This is a closure (See the scope section)
- This function is async
- We use `Immediately-Invoked Function Expression` (IIFE) to call it

--
# Debugging
Anonymousing functions is a bad practice
- Can't be traced proprely for debugging purpose
  - Grouped together from a performance point of view
- Less verbose code, might need more comments
- Not reusable 

Closure and namespace are the only valuable use of anon. functions

> See some [Arguments for named functions](http://stackoverflow.com/questions/15336347/why-use-named-function-expressions) <!-- .element: target="_blank" -->

A good [article](https://remysharp.com/2015/10/14/the-art-of-debugging) <!-- .element: target="_blank" -->

---
# Scope
A scope is: **the part of the code where variables are visible and accessible**
  - Scope are nested
  - AS of ES5, javascript is function

```javascript
// We are in the global scope

function init(){
  //We are in the local init function scope
  if(...){
    // We still are in the local init function scope
  }
}
// We are back in the global scope: 
// when a function returns, its local scope is destroyed
```

--
## Globally-scoped variable
```javascript
var a = 1; // global scope

function one() {
  console.log(a); // Display 1
}
console.log(a); // Display 1
```

--
## Local scope
```javascript
var a = 1; // global scope

function two(a) { // local scope
  console.log(a); // Display the value of a at runtime
}

function three() {
  var a = 3; // local scope again
  console.log(a); // Display 3
}
console.log(a); // Display 1
```

--
## Nested scope
```javascript
function primaryFunction(){
  var a = 1; // local primaryFunction scope
  function nestedFunction() {
    var b = 2;
    console.log(a); // Display 1
  }
  console.log(b); // Display undefined
}
```

--
## No block scope for `var`
```javascript
var a = 1; // Global scope

function four() {
  if (true) {
    var a = 4; // Local function scope
  }

  console.log(a); // Display 4
}
```
Remember hoisting:
```javascript
var a = 1; // Global scope

function four() {
  var a; // Variable declaration, local scope
  if (true) {
    a = 4; // Local function scope
  }

  console.log(a); // Display 4
}
```

[source](http://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript) <!-- .element: target="_blank" -->
--
# Sneak peek into ES6
#### let versus var and const variables
- `var`: **function scope**, signal that it might be reassigned
- `let`: **block scope**, signal that it might be reassigned
  - Not hoisted
  - Not properties on the global object
- `const`: **block scope**, signal that it won’t be reassigned
  - Same as let variables, but not reassignable


--
## Block scope 
```javascript
function four() {
  // a is NOT defined here
  if (true) {
    // a is NOT defined here
    let a = 4; 
    // a is defined here
  }
  // a is NOT defined here

  console.log(a); // Display undefined
}
```
About const:
```javascript
const aConstVar = 'stuck';
aConstVar = 5000; // SyntaxError
```

For an in depth explanation check [this article](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75) <!-- .element: target="_blank" -->

---
# Closure
A Closure is a function returning an inner-function.
```javascript
function outerFunction(){ // <-- This is a closure
  function innerFunction(){} // As a function defined inside an other function

  return innerFunction;
}

```
Some interesting thing happend when you do that:
  - A closure scope is not destroyed when it returns
  - The returned inner-function can still access the scope of the closure when it will be used

--
# Example
```javascript
function makeAdder(x) { 
  // x is defined in the local scope of makeAdder
  function addX(y){
    // y is defined in the local scope of makeAdder
    return x + y; // We can access the outer function scope
  }
  return addX; // We return the function which have a reference to a variable in the outer function scope
};

var add5 = makeAdder(5);
console.log(add5(7)); // Display 12
```
We can use closure to *save the state* of our application at a given time for a given function.

See the closure.js file in the exercices folder

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) <!-- .element: target="_blank" -->

[Diving deep into closures](http://www.jibbering.com/faq/notes/closures/) <!-- .element: target="_blank" -->

---
# Exercice
Create a simple [proxy server](https://en.wikipedia.org/wiki/Proxy_server) using NodeJS:
- Create a nodeJS server as seen in lesson1
- Use URLs like http://...?website=monip.org
- Use `http` module to make a request from the NodeJS server
- Return the fetched data into the response

--
# Regex
Regex are very usefull to check if a string conains an other one:
```javascript
//A regex definition:
/favicon/

// How to test a regex
var str = "mon favicon"
/favicon/.test(str); //return true
/salut/.test(str); //return false
```

use it to check the url and remove useless calls!
```javascript
http.createServer(function (req, res) { // This callback is called every time a request come to the webserver
  if(/favicon/i.test(req.url)){
    res.writeHead(404);
    res.end();  
    return;
  }
```
--
# String parsing
There is a lot of usefull function to parse string

Example: parsing simple urls
```javascript
// Url simple: http://mon.site.com/ma/route?arguments=value&arguments2=value2
var arrayUrl = req.url.split("?");
var agmtsString = arrayString[1]; // arguments=value&arguments2=value2
var agmts = agmtsString.split("&");
var paramObjet = {};
for(var i = 0; i < agmts.length; i++){
  var argument = agmts[i].split("=");
  paramObjet[argument[0]] = argument[1];
}
console.log(paramObjet);
```

--
# Http request
The [`http` module](https://nodejs.org/api/http.html#http_http_request_options_callback) of NodeJS allows you to make http request easily <!-- .element: target="_blank" -->

It allows you to make http response too!
```javascript
var http = require('http'); 

var options = { host: 'google.com' };
// Create the request
var myReq = http.request(options, function(response){}); // Pass a callback to handle the response
// myReq.write(postData); // You can write some post data if you make a POST request
myReq.end(); // Send the request
```

```javascript
// Inside the callback

//Write the response headers
response.writeHead(responseStatusCode, responseHeaders); 
response.write(data); // Write the response body
response.end();  // Send your response
```