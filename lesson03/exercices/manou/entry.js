require("!style!css!./style.css");

var handler = require("./content.js");

document.write("It works yeah;");

counter = 0;
var incrementCounter = function(){
  handler(counter);
  counter++;
}
var interval = setInterval(incrementCounter, 1000);

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept("./content.js", function() {
        // You can do pre action
        console.log("cleaning the interval function");
        clearInterval(interval);

        console.log("Loading the new handler");
        handler = require("./content.js");

        // you can do post action
        console.log("Starting the counter again");
        interval = setInterval(incrementCounter, 1000);
    });
}