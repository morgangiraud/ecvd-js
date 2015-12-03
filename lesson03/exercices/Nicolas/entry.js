document.write("It works.");
var f = require("./content.js");
require("!style!css!./style.css");

var i = 0;

var interval = setInterval(iPlus, 1000);

function iPlus(){
	i++;
	f(i);
}

if(module.hot) {
    // accept update of dependency
    module.hot.accept("./content.js", function() {
        f = require("./content.js");
    });
}