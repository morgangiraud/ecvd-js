# JS / Algo
## More on data structure, streams and a look at the this keyword

*Pre-requisites: lesson 6*

*ECV Digital - 3/12/2015*

---
Streams
Mutability
Usefull array methods
Strings Object and their properties
The Math object

---
# This

The keyword `this` represent the current context in which the code is evaluated
```javascript
console.log(this) // This is an object
```

<!-- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_this
http://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
http://stackoverflow.com/questions/133973/how-does-this-keyword-work-within-a-javascript-object-literal -->

--
# What is this ?

```javascript
console.log(this) // Global/Root context

function bar() {
  console.log(this); // Local function context
}
bar();

var myObject = {
  func: function(){
    console.log(this);
  }
}
myObject.func();
```

---
# Variables binding
## Bind
You can control
```javascript
var myObject = {
  data: 2,
}
function logThis(){console.log(this.data);}
var boundLogThis = logThis.bind(myObject)
boundLogThis() // Display the data 
```

--
# Variables binding
## Call & Apply

```javascript
var myObject = {
  data: 2,
}
function logThis(){console.log(this.data);}
logThis.call(myObject, "My", "arguments") // Display the data 
logThis.apply(myObject. ["My", "arguments"]) // Display the data 
```

The only difference between those two is: 
```javascript
theFunction.apply(valueForThis, arrayOfArgs)
theFunction.call(valueForThis, arg1, arg2, ...)
```

---
# The 4 rules
## 1
> The keyword "this" refers to whatever is left of the dot at call-time.

```javascript
var myObject = {
  func: function(){console.log(this);}
}
myObject.func() // Display the object myoBject
```

--
# The 4 rules
## 2
> If there's nothing to the left of the dot, then "this" is the root scope (e.g. Window).

```javascript
function logThis(){
  console.log(this);
}
logThis() // Display the object window in the browser
```

--
# The 4 rules
## 3
> 3 functions change the behavior of "this" 
  - bind, call and apply

```javascript
var myObject = {
  data: 2
}
function logThis(){
  console.log(this);
}
logThis.bind(myObject)(); // Display the object myObject
logThis.call(myObject); // Display the object myObject
logThis.apply(myObject); // Display the object myObject
```

--
# The 4 rules
## 4
> The keyword "new" binds this to the object just created


---
# Prototype


http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work
http://stackoverflow.com/questions/26324395/whats-the-javascripts-object-prototype-behavior

native function

http://www.sitepoint.com/5-typical-javascript-interview-exercises/

the new keyword


Crazy shits is going on !


---
EventListeners ! HO my !

---
Streams

---
# the new keyword
http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
http://zeekat.nl/articles/constructors-considered-mildly-confusing.html