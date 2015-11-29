"use strict";

require("./style.css");

var koko = require("./content.js");

var i = 1;
let div;

var increment = function() {
	i++;
	koko(i);

	div = document.createElement('div');
	div.innerHTML = "I'm Batman";
	document.body.appendChild(div);
}

var interval = setInterval(increment, 500);

if(module.hot) {
	module.hot.accept("./content.js", function() {
		koko = require("./content.js");
	});
}
