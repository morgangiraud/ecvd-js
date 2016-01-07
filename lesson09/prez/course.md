# JS / Algo
## Regular Expressions

*Pre-requisites: lesson 8*

*ECV Digital - 7/01/2016*

This course is just a sumup in slides of this [very interesting course](http://eloquentjavascript.net/09_regexp.html) <!-- .element: target="_blank" -->
---
## Creating RegExp
In javascript, you can write a regexp in two different manner:

```javascript
var regex1 = new RegExp("abc"); // No delimiter
var regex2 = /abc/; // Only accepted delimiter
```

--
## Testing for matches
You can test a string to check if it contains a match of the pattern in the expression.

```javascript
console.log(/abc/.test("abcde")); // → true
console.log(/abc/.test("abxde")); // → false
```

If abc occurs anywhere in the string we are testing against (not just at the start), test will return true.

--
## Matching a set of characters
In a regular expression, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets.

```javascript
console.log(/[0123456789]/.test("in 1992")); // → true
console.log(/[0-9]/.test("in 1992")); // → true
// a dash (-) between two characters can be used to indicate a range of characters
```
> You can see `[]` as a `OR` statement

You can also use [metacharacter](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp) in brackets

--
## Choice patterns
More globally, The pipe character (|) denotes a choice between multiple patterns

```javascript
var animalCount = /(pig|cow|stuff)s?/; 
console.log(animalCount.test("pigs")); // → true
console.log(animalCount.test("cow")); // → true
console.log(animalCount.test("chickens")); // → false
```

--
## Matching a set of characters

Using a caret (^) character after the opening bracket invert invert the set

```javascript
var notBinary = /[^01]/; // D'ont match 1 nor 2
console.log(notBinary.test("1100100010100110")); // → false
console.log(notBinary.test("1100100010200110")); // → true
```

---
## Matches 
One can use the exec (execute) method which  will return null if no match was found and return an object with information about the match otherwise.

```javascript
var match = /\d+/.exec("one two 100");
console.log(match); // → ["100", index: 8, input: "one two 100"]
console.log(match.index); // → 8, position of the first successful match

// You also have a match method directly on strings
console.log("one two 100".match(/\d+/)); // → ["100"]
```

--
## Groups
When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array. 
```javascript
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); 
// → ["'hello'", "hello", index: 9, input: "she said 'hello'"]
```
When a group does not end up being matched at all its position in the output array will hold undefined
``` javascript
console.log(/bad(ly)?/.exec("bad"));  // → ["bad", undefined, index: 0, input: "bad"]
```

--
## Groups
When a group is matched multiple times, only the last match ends up in the array.
```javascript
console.log(/(\d)+/.exec("123")); 
// → ["123", "3", index: 0, input: "123"]
```

---
## The replace method

String values have a replace method, which can be used to replace part of the string with another string.

```javascript
console.log("papa".replace("p", "m")); // → mapa

//You can also use RegExp
console.log("Borobudur".replace(/[ou]/, "a")); // → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar
```

--
## The replace method
The real power of using regular expressions with replace comes from the fact that we can refer back to matched groups 

```javascript
//This is a one-liner to invert firstname and lastname
console.log(
  "Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
    .replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));
// → Grace Hopper
//   John McCarthy
//   Dennis Ritchie
```
The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern. 

--
## The replace method
It is also possible to pass a function, rather than a string, as the second argument to replace. 

```javascript
var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
  return str.toUpperCase();
}));
// → the CIA and FBI
```

You can go pretty crazy:
```javascript
var s = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  else if (amount == 0)
    amount = "no";
  return amount + " " + unit;
}
console.log(s.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
```

---
## Greed
The main idea iwith RegExp is that they-re greedy in the sens that nay metachracter will try to match as mush as it can

```javascript
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3")); // → 1 + 3
console.log(stripComments("x = 10;// ten!")); // → x = 10
console.log(stripComments("1 /* a */+/* b */ 1")); // → 1  1
// * is too greedy, the last example is a fail
```


Adding a `?` make greedy metacharcters non-greedy
```javascript
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1")); // → 1 + 1
```

--
## The lastIndex property
Regular expression objects have properties. 
 - `source`: it contains the string that expression was created from. 
 - `lastIndex`: it controls, in some limited circumstances, where the next match will start.
  - The regular expression must have the global (g) option enabled
  - the match must happen through the exec method

```javascript
var pattern = /y/g; // Notice the g global flag
var match = pattern.exec("xyzzy");
console.log(match.index); // → 1
console.log(pattern.lastIndex); // → 2
pattern.exec("g")
console.log(pattern.lastIndex); // → 0
```

--
##Looping over matches

A common pattern is to scan through all occurrences of a pattern in a string, in a way that gives us access to the match object in the loop body, by using lastIndex and exec.

```javascript
var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Found", match[1], "at", match.index);
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40
```

---
## International characters
JavaScript handles badly non latin characters:

For example, a “word character” is only one of **the 26 characters in the Latin alphabet (uppercase or lowercase)** and **the underscore character**

---
# Exercices
Train yourself on the exercice files you can find in the exercices directory

Be bold, and do some [regex golf](http://regex.alf.nu/)