require("./style.css");
var f = require("./content.js");
var i=0;

var increment = function() {
	i++;
	f(i);
}

var a = setInterval(increment, 1000);

if(module.hot) {
    module.hot.accept("./content.js", function() {
    	f = require("./content.js");
    });
}