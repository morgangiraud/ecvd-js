require("!style!css!./index.css");
require("!style!css!./base.css");

document.write('\
  <section class="todoapp"> \
    <header class="header"> \
      <h1>todos</h1> \
      <input class="new-todo" placeholder="What needs to be done?" autofocus> \
    </header> \
    <section class="main"> \
      <ul class="todo-list"></ul> \
    </section> \
    <footer class="footer"> \
      <span class="todo-count"></span> \
    </footer> \
  </section> \
  <footer class="info">\
  </footer>'
);

var init = require("./app.js");
var app = init();

// Events
var newInput = document.querySelector("input.new-todo");
newInput.addEventListener("keypress", function(e){
  if(e.charCode === 13 && newInput.value != ""){
    app.addTodo(newInput.value)
    newInput.value = "";
  }
});

var ul = document.querySelector("ul.todo-list");
ul.addEventListener("click", function(e){
  if(e.target.nodeName === "BUTTON" && e.target.className === "destroy"){
    app.removeTodo(e.target.parentElement.parentElement.dataset.id); 
    return
  }

  console.log(e.target.nodeName);
  if(e.target.nodeName === "BUTTON"){

  }
})

// Hot reloading
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