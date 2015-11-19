# JS / Algo
## Scope, data structure and events

*Pre-requisites: lesson 4*

*ECV Digital - 12/11/2015*

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
  // You can access the global scope everywhere
  console.log(a); // → 1
}
console.log(a); // → 1
```
> Everywhere means EVERYWHERE, even in other script tag on an html page

--
## Local scope
```javascript
var a = 1; // global scope

function two(a) { // local scope
  console.log(a); // → the value of a at runtime
}
two(2); // → 2

function three() {
  var a = 3; // local scope again
  console.log(a); // → 3
}

console.log(a); // → 1
```

--
## Nested scope
```javascript
function primaryFunction(){
  var a = 1; // local primaryFunction scope
  function nestedFunction() {
    var b = 2;
    console.log(a); // → 1
  }
  console.log(b); // → undefined
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

  console.log(a); // → 4
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

  console.log(a); // → 4
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
    // a is defined here but not assigned (hoisting)
    let a = 4; 
    // a is defined here
  }
  // a is NOT defined here

  console.log(a); // → undefined
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
A Closure is a function returning an other function.
```javascript
function outerFunction(){ // <-- This is a closure
  function innerFunction(){} // As a function defined inside an other function

  return innerFunction;
}

```
Some interesting thing happend when you do that:
  - A closure scope is not destroyed when it returns
  - The returned inner-function can still access the scope of the closure when it will be used

[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) <!-- .element: target="_blank" -->

--
# Example
## Keeping state
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
console.log(add5(7)); // → 12
```
We can use closure to *save the state* of our application at a given time for a given function.

[Diving deep into closures](http://www.jibbering.com/faq/notes/closures/) <!-- .element: target="_blank" -->
--
# Exercice:
Write a closure containing:
- a local state with default value 'pending'
- an inner-function able to update his local state to 'cancel' or 'validated'
- The inner function called without any argument must log the current localState

The closure must returns the inner function to be a closure ...

---
## Data structure: Arrays
- can store multiple type of data
- are dynamic
- have properties (it is an object behind the scene)
- we can add or remove keys as we please (be carefull)

```javascript
// Dynamic arrays
var myArray = [];
var myArray2 = Array();
// You can also set an array's size
var myArray3 = Array(10); // CPU optimization but memory consuming
// Or create an array directly with data
var myArray4 = [3,Array("test", null),{}, false]; // Anything can be stored in an array
// Arrays are 0-indexed
console.log(myArray4[0]); // → 3 
// Accessing an Array native property
console.log(myArray4.length); // → 4
```

```javascript
console.log(typeof([])); // → object
```
<!-- .element: class="fragment" -->

--
## Data structure: Arrays
> Arrays don't exist in javascript

<iframe src="//giphy.com/embed/Z8jRxi0nxYWnS" width="240" height="225" frameBorder="0" class="giphy-embed"></iframe>


> And yet, they have a reality and have custom properties

<!-- .element: class="fragment" -->
[Here is the main difference](http://stackoverflow.com/questions/874205/what-is-the-difference-between-an-array-and-an-object) <!-- .element: target="_blank" -->
and [a tricky consequence](http://stackoverflow.com/questions/16196338/json-stringify-doesnt-work-with-normal-javascript-array) <!-- .element: target="_blank" -->

<!-- .element: class="fragment" -->

--
## Data structure: Objects
Values of the type object are arbitrary collections of properties
- we can add or remove these properties as we please
- can store multiple type of data
- are dynamic
```javascript
var myObject = {
  datum: false,
  data: ["work", "touched tree", "pizza", "running", "television"]
}; 
console.log(myObject.datum); // → false 
console.log(myObject.otherDatum); // → undefined
myObject.otherDatum = false;
console.log(myObject.otherDatum); // → false
delete myObject.otherDatum
console.log(myObject.otherDatum); // → undefined
```

--
## Data structure: Objects
Due to the duality between Array and Object in javascript, property can accessed in two ways:
```javascript
var myObject = {
  datum: false,
  data: ["work", "touched tree", "pizza", "running", "television"]
}; 
console.log(myObject.datum, myObject["datum"]); // → false, false
```

**But with `[]` the property is evaluated:**
```javascript
var myObject = {}; 
var dynKey = "hop";
myObject.dynKey = 1;
myObject[dynKey] = 2;
console.log(myObject);
```
> → `{ dynKey: 1, hop: 2 }`

<!-- .element: class="fragment" -->

--
## The global object
The global scope has a special global object where every global variables are also stored

In the browser it is the `window` object:
```javascript
var myVar = 10;
console.log(window.myVar); // → true
```

Which means, you can always have acces to a global var:
```javascript
var a = 1; // Global scope
function four() {
  var a = 4; // Local function scope

  console.log(a); // → 4
  console.log(window.a); // → 1
}
```
--
# Exercice 1
- Write a `range` function that takes two arguments, `start` and `end`, and returns an array containing all the numbers from `start` up to (and in- cluding) `end`.
- Next, write a `sum` function that takes an array of numbers and returns the sum of these numbers. 
- Run the following program and check that it displays 55.

```javascript
console.log(sum(range(1, 10)));
```

Help yourself with [JS native array functions](http://www.w3schools.com/js/js_array_methods.asp) <!-- .element: target="_blank" -->

--
# Exercice 2
Create a list: 
- A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

```javascript
var list = {
  value: 1, 
  next: {
    value: 2, 
    next: {
      value: 3,
      next: null 
    }
  } 
};
```
--
# Exercice 2
- Write a function `arrayToList` that builds up a data structure like the previous one when given `[1, 2, 3]` as argument
- write a `listToArray` function that produces an array from a list
- Run the following program and check that it returns true.

```javascript
var data = [2, "test", false, {"ref": 3}];
console.log(data === arrayToList(listToArray(data)));
```

---
# Events
In the browser, every possible events (mouse click, key press, etc.) is an `event`.

In the browser, all the DOM nodes is transformed into a DOM Element which has man native function.

Especially you can find the `addEventListener` function (The window object has also this function):

```javascript
function addEventListener(event, callback);
```

[There is a lot of events](https://developer.mozilla.org/en-US/docs/Web/Events) <!-- .element: target="_blank" -->

--
# Events Listener
You can plug this function directly to the global object:

```javascript
addEventListener("click", function() {
  console.log("You clicked!");
});
```
> Type it in the browse console and click in the window

--
# Exercice
- Bind an eventListener to a DOM Element listening to the click event:
  - use the eventlistener.html file in the exercice folder
- Find the keyboard key event and listen to it on the same DOM Element
  - Display the keyboard key code

> JavaScript provides multilpes ways to select DOM Element especially
```javascript
var body = document.querySelector("body"); 
console.log(body); // → <body>...</body>
```

---
## Project: a Todo list
Using all we've seen, we'll build a simple todolist (trough next courses) with the following feature:
- Add a todo item
- Edit a todo item
- Check a todo item 
- delete a todo item
- Chow all items
- Show only active items
- Show only Completed items

--
# Project: A Todo list
> 
- Create the **"add an item"** feature
- Create the **"delete an item"** feature

- Create a webpack environment
- Create a first file called `app.js` with HOT reloading activated
- Use multiple files
- Use all you know about functions / scope / arrays / objects
- use the template in the todoapp folder