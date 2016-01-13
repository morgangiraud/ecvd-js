# JS / Algo
## Intoduction to functionnal programming

*Pre-requisites: lesson 9*

*ECV Digital - 14/01/2016*

---
## What is functionnal programming

It is a programming paradigm: a style of writing  computer programs that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

--
## Basic blocks
To write in a functionnal programming way, one must have:
- First-class functions, functions can be
  - passed as an argument
  - returned from a function
  - assigned to a variable
- Closures
  - Functions can access outer scope
- Simple lambda syntax (anonymous functions)

> Awesome, JavaScript has everything !

--
## Pure functions notion
**Idempotence**

> Given the same inputs, a pure function will always return the same output

```javascript
var xs = [1,2,3,4,5];

// pure
xs.slice(0,3); //=> [1,2,3]
xs.slice(0,3); //=> [1,2,3]
xs.slice(0,3); //=> [1,2,3]

// impure
xs.splice(0,3); //=> [1,2,3]
xs.splice(0,3); //=> [4,5]
xs.splice(0,3); //=> []

```
--
## Pure functions
**Free from Side-effects**

> Pure functions can be safely applied with no side-effects, meaning that they do not mutate any shared state or mutable arguments

```javascript
var counter = 0;
function incrementCounter(){ // Indempotent but not pure
  counter++;
  return true;
}
incrementCounter(); //=> true (counter === 1)
incrementCounter(); //=> true (counter === 2)
```

---
### Imperative and declarative style
**Imperative programming**

> telling the "machine" how to do something, and as a result what one want to happen will happen.

**Declarative programming**

> telling the "machine" what one would like to happen, and let the computer figure out how to do it.

--
# Example
Iterating over an array and changing values

**Imperative programming**
```javascript
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var len = a.length;
for (var i = 0; i < len; i++) {
  a[i] = a[i] + 1;
};
``` 
<!-- .element: class="fragment" -->

**Declarative programming** <!-- .element: class="fragment" -->
```javascript
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
a = a.map(function(i) {
  return i + 1;
});
```
<!-- .element: class="fragment" -->

--
## Examples
**Declarative programming**
```javascript
// Inside an external library
function add1(i){
  return i + 1;
}

/**********************************/

// Your Declarative code
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
a = a.map(add1); // Real declarative code
```

--
## Declarative advantage
- Less likely to contain a bug (less lines of code)
- Easier to test
- Avoid copy/paste problem and maximise reusability
- Easier to understand at eyesight

---
## The gorilla/banana problem!

The problem with object-oriented languages is object have got all this implicit environment that they carry around with them. 

> **You wanted a banana but what one got was a gorilla holding the banana and the entire jungle.**

*Joe Armstrong, creator of Erlang, on software reusability*

--
## The gorilla/banana problem!
If one have referentially transparent code and pure functions 
> all the data comes in its input arguments and everything goes out and leave no state behind

> it’s incredibly reusable!

*Joe Armstrong, creator of Erlang, on software reusability*

---
## A little bit of theory
FP is based on the category theory which is a branch of math studying ... category!

A category must contains :
- A collection of objects
- A collection of [morphisms](https://en.wikipedia.org/wiki/Morphism) <!-- .element: target="_blank" -->
- A notion of composition on the morphisms
- A distinguished morphism called identity

--
## In Javascript ?
- The collection of objects are **`data type`**
- The collection of morphism are **`pure functions`**
- We can easily write a compose and an identity functions:

```javascript
function compose(f, g){
  return function (x){
    return f(g(x));
  }
}
function id(x){
  return x;
}
```
<!-- .element: class="fragment" -->

--
## Associativity
Everytime one work with pure functions one can say that:

```javascript
// f, g and h are functions
compose(f, compose(g, h)) == compose(compose(f, g), h);
```

--
## Currying
Currying is a way of constructing functions that allows partial application of a function’s arguments

```javascript
//Let's say we have an add function
add(3, 5); // => 8

// Let's apply partial argument
var add3 = add(3);
add3(5); // => 8
add3(10); // => 13
```

> Exercice: write an curry add function

--
## Memoization
Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results.

```javascript
// Here is the code for the fibonnaci calculus:
function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

> Exercice: Write the memoize fibonnaci function

---
# Final thought
A very nice comparison between OOP and FP can be found [here](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.wbiybcoqq)<!-- .element: target="_blank" --> and is summed up in the next slides

--
## Final thought
OOP pros:
 - Easy to understand the basic concept of objects
 - Easy to interpret the meaning of method calls

 ---- 

OOP cons:
 - Depends on shared state
 - Objects and behaviors are tacked together on the same entity
 - Concurrent access any number of functions with non-deterministic order may lead to undesirable behavior such as race conditions

--
## Final thought
FP pros:
- Avoid any shared state or side-effects
- Functions tend to be simplified and easily recomposed
- Favors declarative style
- Easing refactoring and performance optimization

 ---- 

FP cons:
- The code need to be very well to have the clarity benefit
- The code can become too abstract
- Harder to learn, more conceptual and abstract
- Even common idioms can be confusing to beginners