require("!style!css!./index.css");
require("!style!css!./base.css");

var init = require("./app.js");
var app = init();

if(module.hot) {
  module.hot.accept("./app.js", function() {
    var todos = app.getTodos(); // We save the current todos
    document.querySelector("ul.todo-list").removeEventListener("click");
    document.querySelector("input.new-todo").removeEventListener("click");

    init = require("./app.js"); // We replace the application
    app = init();

    app.setTodos(todos); // We set back the current todos
  });
}