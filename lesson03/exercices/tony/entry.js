require("./style.css");


var coco = require("./content.js");

var i = 0;
var increment = function () {
    i++;
    coco(i);
}


var interval = setInterval(increment, 100);



if (module.hot) {
    // accept update of dependency
    module.hot.accept("./content.js", function () {
        coco = require("./content.js");
    });
}