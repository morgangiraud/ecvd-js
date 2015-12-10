# JS / Algo
## More on data structure and a look at the this keyword

*Pre-requisites: lesson 6*

*ECV Digital - 3/12/2015*

---
## Mutability
Native types (Numbers, Strings, and Booleans) are Immutable: **it is impossible to change an existing value of those types**
```javascript
var str = "rat";
str[0] = "c";
console.log(str); // → "rat"
```

On the other hand, objects (and arrays) are mutable: **the content of a value can be modified by changing its properties**
```javascript
var object1 = {value: 10};
object1.value = 20;
console.log(object1); // → {value: 20}
```

--
## Mutability
With objects, there is a difference between having two references to the same object and having two different objects that contain the same properties.

```javascript
var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

console.log(object1 === object2); // → true
console.log(object1 === object3); // → false
```

When we assing an object, we assign a reference
```javascript
var object1 = {value: 10};
var object2 = object1;
object1.value = 15;
console.log(object2.value); // → 15
```

---
## Strings and their properties
Strings have properties like **`length`** and **`toUpperCase`**. 

Yet, if you try to add a new property, it doesn’t stick:
```javascript
var myString = "Fido";
myString.myProperty = "value";
console.log(myString.myProperty); // → undefined
```

Values of type string, number, and Boolean are not objects

**Again: values are immutable and cannot be changed**

--
## Strings and their properties
Yet, these types do have some [built-in properties](http://www.w3schools.com/jsref/jsref_obj_array.asp) <!-- .element: target="_blank" -->

The most useful ones are probably **`slice`** and **`indexOf`**
```javascript
console.log("coconuts".slice(4, 7)); // → nut
console.log("coconut".indexOf("u")); // → 5
```

**`indexOf`** can take a string containing more than one character
```javascript
console.log("abcdefgh".indexOf("efg")); // → 4
```

--
## Strings and their properties
**`trim`** removes whitespace (spaces, newlines, tabs, and similar characters) from the start and end of a string.

```javscript
console.log("  okay \n ".trim()); // → "okay"
```

**`length`** return the number of chars in the string
```javascript
console.log("abc".length); // → 3
```

You can access characters in a string in different ways:
```javascript
var string = "abc";
console.log(string.charAt(0)); // → a
console.log(string[1]); // → b
```

---
## The Math object
[The Math object](http://www.w3schools.com/jsref/jsref_obj_math.asp) is used simply as a container to group a bunch of related functionality. <!-- .element: target="_blank" -->

It provides a namespace to mathematical functions:
 - Trigonometry `Math.cos`, `Math.sin`, ...
 - Random numbers `Math.random`
 - round numbers `Math.floor`, `Math.ceil`, `Math.round`

---
# This

The keyword `this` represent the current context in which the code is evaluated
```javascript
console.log(this); // This is an object
```

<!-- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_this
http://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
http://stackoverflow.com/questions/133973/how-does-this-keyword-work-within-a-javascript-object-literal -->

--
# What is this ?

```javascript
console.log(this); // Global/Root context

function bar() {
  console.log(this); // Depends when the call is made
}
bar(); // Global/Root context

var myObject = {
  func: function(){
    console.log(this);
  }
}
myObject.func();
```

--
# Variables binding
## Bind
You can control
```javascript
var myObject = {
  data: 2,
}
function logThis(){
  console.log(this.data);
}
var boundLogThis = logThis.bind(myObject);
boundLogThis(); // Display the data 
```

--
# Variables binding
## Call & Apply

```javascript
var myObject = {
  data: 2,
}
function logThis(){console.log(this.data);}
logThis.call(myObject, "My", "arguments"); // Display the data 
logThis.apply(myObject. ["My", "arguments"]); // Display the data 
```

The only difference between those two is: 
```javascript
theFunction.apply(valueForThis, arrayOfArgs);
theFunction.call(valueForThis, arg1, arg2, ...);
```

--
# The 4 rules
## 1
> The keyword "this" refers to whatever is left of the dot at call-time.

```javascript
var myObject = {
  func: function(){console.log(this);}
}
myObject.func(); // Display the object myoBject
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

It won't be discussed in this course

---
## Array functions
Introducing some generally useful array methods.
> **`push`** and **`pop`**, which add and remove elements at the end of an array

push
```javascript
var todoList = ["task1", "task2"];
var result = todoList.push("task3");
console.log(result);  // → 3: the length of the array
console.log(todoList);  // → ["task1", "task2", "task3"]
```

pop
```javascript
var todoList = ["task1", "task2", "task3"];
var result = todoList.pop();
console.log(result); // → "task3"
console.log(todoList); // → ["task1", "task2"]
```
--
## Array functions
> **`unshift`** and **`shift`**, which add and remove elements at the beginning of an array

unshift
```javascript
var todoList = ["task1", "task2"];
var result = todoList.unshift("task0");
console.log(result); // → 3: the length of the array
console.log(todoList); // → ["task0", "task2", "task3"]
```

shift
```javascript
var todoList = ["task1", "task2", "task3"];
var result = todoList.shift();
console.log(result); // → "task1"
console.log(todoList); // → ["task2", "task3"]
```

--
## Array functions

> **`indexOf`** and **`lastIndexOf`**, which starts searching for the given element from the start and the end  of an array

```javascript
console.log([1, 2, 3, 2, 1].indexOf(2)); // → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); // → 3
```

They both take an optional second argument that indicates where to start searching from.
```javascript
console.log([1, 2, 3, 2, 1].indexOf(2, 2)); // → 3
```

--
## Array functions
> **`slice`**, which takes a start index (inclusive) and an end index (exclusive) and returns an array that has only the elements between those indices. 

When the end index is not given, slice will take all of the elements after the start index. 

```javascript
console.log([0, 1, 2, 3, 4].slice(2, 4)); // → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2)); // → [2, 3, 4]
```

--
## Array functions
> **`concat`** which take an other arrayas argument and glue it on the first array

It is imilar to what the + operator does for strings. 

```javascript
console.log(["a", "b", "c"].concat(["d", "e"]));
// → ["a", "b", "c", "d", "e"]
```

---
# Project: A Todo list
> 
- Add the done/undone feature
- Add the capacity to drag and drop task