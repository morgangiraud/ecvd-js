require("./style.css");
var n = require("./content.js");
var i = 0;


var increment = function(){
	i++;
	
	n(i);
}

var a = setInterval(increment, 500);

if(module.hot){

 module.hot.accept("./content.js", function() {
 	n = require("./content.js");
});

 }