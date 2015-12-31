# Correction

## Algorithmy

### Exercice 1
Good - 2 pts

### Exercice 2
First algo:
- Good - 2 pts

Second algo:
- Good but the complexity is said the same in your case (n/2 ~ n) - 1,5 pts

### Exercice 3
First algo: 
- Good algorithm but the complexity is n^3 - 1 pt (indexOf is a complexity of n inside two nested loops of complexity n each)


Second algo: 
- Good algorithm but you forget to add a return statement in the recursive call...
- The complexity is the n^2  - 1 pt

----

**Total: 7,5 pts**


## Javascript

- The game is working 
- You decided to moved out some vars out of the init function scope, that wat not needed in your code (-0,5 pt)
- You dit not follow the rules to make the game harder, you should have reduce the square **AND** reduce the `maxTime` (-0,5 pt)
- You don't save a scores well and you show `null` result in the score table (-0,5 pt)

When you set a callback function to an event, avoid adding an anonymous function if it is not needed:
```javascript
box.onclick = function() {
  nextTurn();
};
```
Should be 
```javascript
box.onclick = nextTurn;
```

----


**Total: 8,5 pts**


# Your grade
**16 pts**

Good job !

Good work on the algorithm part, be carefull to avoid basic mistakes as missing the return statement in recursive calls!

The work done on javascript is very good, no real javascript mistakes. Keep on going !