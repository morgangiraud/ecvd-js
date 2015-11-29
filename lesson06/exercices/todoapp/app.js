var item = require('./item.js')

function initTodo(){
  "strict"

  var todos = [];
  var ul = document.querySelector("ul.todo-list");
  var newInput = document.querySelector("input.new-todo");

  function addTodo(todoText){
    todos.push(item.create(todoText));
    refresh();
  }

  function removeTodo(todoId){
    todoId = parseInt(todoId, 10);
    for (var i = todos.length - 1; i >= 0; i--) {
      if(todos[i].id === todoId){
        todos.splice(i, 1);
      }
    };
    refresh();  
  }

  function refresh(){
    str = "";
    for (var i = todos.length - 1; i >= 0; i--) {
      str += '<li data-id="' + todos[i].id + '" class=""><div class="view"><label>' + todos[i].text + '</label><button class="destroy"></button></div></li>';
    }
    ul.innerHTML = str;
  }
  
  // Hot reloading helpers
  function getTodos(){
    return todos;
  }

  function setTodos(newTodos){ // Reinitialise the currentId counter    
    todos = newTodos;
    refresh();
  }

  // Events
  newInput.addEventListener("keypress", function(e){
    if(e.charCode === 13 && newInput.value != ""){
      addTodo(newInput.value)
      newInput.value = "";
    }
  });
  ul.addEventListener("click", function(e){
    if(e.target.nodeName === "BUTTON" && e.target.className === "destroy"){
      removeTodo(e.target.parentElement.parentElement.dataset.id); 
    }
  })

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    refresh: refresh,
    getTodos: getTodos,
    setTodos: setTodos
  }
}

module.exports = initTodo;


if(module.hot) {
  module.hot.accept("./item.js", function() {
    var currentId = item.getCurrentId();

    item = require("./item.js"); // We replace the application

    item.setCurrentId(currentId);
  });
}