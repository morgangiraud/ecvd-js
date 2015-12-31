require("!style!css!./index.css");
require("!style!css!./base.css");

document.write('\
  <section class="todoapp"> \
    <header class="header"> \
      <h1>todos</h1> \
      <input class="new-todo" placeholder="What needs to be done?" autofocus> \
    </header> \
    <section class="main"> \
      <ul class="todo-list" droppable="true"></ul> \
    </section> \
    <footer class="footer"> \
        <span class="todo-count"></span> \
        <ul class="filters"> \
          <li> <a href="#/" class="selected">All</a> </li> \
          <li> <a href="#/active">Active</a> </li> \
          <li> <a href="#/completed">Completed</a> </li> \
        </ul> \
        <button class="clear-completed">Clear completed</button> \
      </footer> \
  </section> \
  '
);

var init = require("./app.js");
var app = init();

// Events
function todoListClickHandler(e){
  if(e.target.nodeName === "BUTTON" && e.target.className === "destroy"){
    app.removeTodo(e.target.parentElement.parentElement.dataset.id); 
    return
  }

  if(e.target.nodeName === "INPUT" && e.target.className === "toggle"){
    if(e.target.checked){
      app.done(e.target.parentElement.parentElement.dataset.id)
    } else {
      app.undone(e.target.parentElement.parentElement.dataset.id)
    }
  }
}

function keyboardHandler(e){
  var newInput = document.querySelector("input.new-todo");

  if(e.charCode === 13 && newInput.value != ""){
    app.addTodo(newInput.value)
    newInput.value = "";
  }
}

function filterClickHandler(e){
  e.preventDefault();
  e.stopPropagation();

  // Remove selected class
  var allFilters = document.querySelectorAll(".filters .selected");
  for (var i = allFilters.length - 1; i >= 0; i--) {
    allFilters[i].className = "";
  };

  if(/active/.test(this.querySelector("a").href)){
    app.show("active");
  } else if( /completed/.test(this.querySelector("a").href)){
    app.show("completed");
  } else {
    app.show("all");
  }
  this.querySelector("a").className = "selected";

  app.refresh();

}
function clearClickHandler(e){
  e.preventDefault();
  e.stopPropagation();

  app.clearCompleted();
}

document.querySelector("input.new-todo").addEventListener("keypress", keyboardHandler);

document.querySelector("ul.todo-list").addEventListener("click", todoListClickHandler);

var filters = document.querySelectorAll("ul.filters li");
for (var i = filters.length - 1; i >= 0; i--) {
  filters[i].addEventListener("click", filterClickHandler);
}

document.querySelector("button.clear-completed").addEventListener("click", clearClickHandler);


// Hot reloading
if(module.hot) {
  module.hot.accept("./app.js", function() {
    var todos = app.getTodos(); // We save the current todos
    document.querySelector("ul.todo-list").removeEventListener("click");
    document.querySelector("input.new-todo").removeEventListener("click");
    document.querySelector("button.clear-completed").removeEventListener("click")

    init = require("./app.js"); // We replace the application
    app = init();

    app.setTodos(todos); // We set back the current todos

    document.querySelector("input.new-todo").addEventListener("keypress", keyboardHandler);
    document.querySelector("ul.todo-list").addEventListener("click", todoListClickHandler);    
    document.querySelector("button.clear-completed").addEventListener("click", clearClickHandler);
  });
}