require("!style!css!./index.css");
require("!style!css!./base.css");

var app = require("./app.js");

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept("./app.js", function() {
        app = require("./app.js");
    });
}