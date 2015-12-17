# Algorithmy/JavaScript - Final test

## Algorithmy (10 pts)
```
For each exercice, write the algorithm and calculate its complexity
```
- Exercice 1 (use the exercice1.js file)

Given `a` and `n` two integer. Using a `loop`, calculate `a power n`

---------------

- Exercice 2 (use the exercice2.js file)
  - Write a first naive approach
  - Write a second optimised function with a better complexity

Given `n` an integer. Using a `loop`, find all the diviser of `n`. Return them as an array.

For example 8 can be divided by 1, 2, 4 and 8 so your return `[1, 2, 4, 8]`

-------------

- Exercice 3 (use the exercice3.js file)
  - Write a first naive approach
  - Write a second optimised function with a better complexity
  
Given an array of `n` elements, sort it.


## JavaScript (10 pts)
```
We are going to write a very simple game
The goal of the game is to have the best highscores among other players !

The game itself will consist at clicking on a square on the screen.
Each time a click on the square is made, the square may gets smaller or the time to click on it may reduce.

Simple isn't it ?

--------------------------------
Those next lines describes needed functions for the game, it is NOT ordered.
Take time to read through the whole exercice.

If you think you need to add any extra functions or data, feel free to do so.
```
- Initialize the Game
  - Write a function named `restart()` which restart the game
    - Don't forget to reinitialize the game's variables
    - Use it as a `closure` for the `init function`
    - Bind it to the `start` and `restart` button `click` event

- Create a `getRandomInBetween` function which return a random number between a `min` and a `max` value

- Create a function named `generateNewSquare` which generate a new square (Use the `div.box` html inside the `boxGame.html` file)  
  - Generate the HTML as a string using the style attributes to set the size and a random position of the `square`
  - Append the `square` to the `playground`
  - Bind the click event to the `nextTurn` function

- Create a function named `nextTurn` which (on each click on the square)
  - Increment the score by 1
  - Make the next turn harder
  - restart the timer
  - generate a new square
  - Update event listeners

- Create a function named `makeTheGameHarder` which
  - 50% of the time, reduce the size of the square
  - 50% of the time, reduce the maximun timing to click on the square
  - Use a random function
  - Tweak it to make the game fun

- Create a function named `incrementScore` which increment the score on each click and update the HTML

- Create a function named `startTimer` which start/restart the timer
  - Use the setInterval/clearInterval function for the timer
  - Each time the interval is called, decrement the current time
  - If the current time is below 0, end the game

- Create a function named `endGame` which end the game
  - Remove any listeners and interval
  - Ask for the username
  - Store the current highScore with the username in the localStorage (you can create a save function)
    - Order highscores and keep only the top ten ones

- Create a function named `load` which load `highscores` from the `localStorage`
  - Update the init function to reflect this change

---------------
- Bonus: If you have time:
  - Clean your code, make it beautifull
  - Clean the design
  - Make an awesome highscore! 

# Conclusion (Mandatory)
- Open the chrome console and copy the JSON string hold by `localStorage`
  - Past the string into a `localStorage.json` file
- Use git to push all your work on the remote repository