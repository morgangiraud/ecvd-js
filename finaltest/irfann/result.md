# Correction

## Algorithmy

### Exercice 1
Your function is calculating the square of a number n times before returning.
The complexity is n (one loop).
0 pt

### Exercice 2
Missing
0 pt

### Exercice 3
First algo: 
- Good algorithm but the complexity is n^2 (n + (n -1) + .. + 2 + 1 = n*(n+1)/2 ~ n^2) - 1 pt


Second algo: 
Missing
0 pt

----

**Total: 1 pt**


## Javascript

- The function `getRandomInBetween` returns a random number between `min` and `min + max`
- The function `generateNewSquare`:
  - Since you should create a square, the `width` should equal to the `height`
  - Your square can be created outside of the window scope
- The function `makeTheGameHarder` should have used the `hardeningCoef` var
- The function `incrementScore` is good
- The function `startTimer`:
  - You remove a millisecond each 10 millisecond which slows down the game
  - you check `if(maxTime==0)` which should be `if(maxTime <= 0)` to be more secure
- The function `endGame`:
- 

Globally the javascript is well written, variables are at a good places, you used all the functions in the closure and the global structure of the game is here.

Suprinsingly, you seemed to struggle on very simple functions as the `genereateNewSquare` function and `getRandomInBetween` function.

----

**Total: 6 pts**


# Your grade
**7 pts**

Keep on going !

You understand well javascript but very simple functions and algorithm seems to make you into trouble, this is clearly a lack of exercices. You had the knowledge to succeed a lot more, you must practice more!