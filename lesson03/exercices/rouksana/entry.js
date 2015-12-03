require("./style.css");

var coco = require("./content.js");
var i = 0;
var increment = function(){
	i++;
	coco(i);
};

var intervall = setInterval(increment, 1000);


if(module.hot) {

	module.hot.accept("./content.js", function() {
		coco = require("./content.js");
	});
}
