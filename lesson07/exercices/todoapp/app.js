var item = require('./item.js')

function initTodo(){
  "strict"

  var dbName = "ecvd-todo";
  var todos;
  var ul = document.querySelector("ul.todo-list");

  if(typeof(Storage) !== "undefined") {
    if(localStorage["ecvd-todo"] !== undefined){
      load();
      refresh();
    } else {
      todos = [];
      localStorage["ecvd-todo"] = JSON.stringify([]);
    }
  } else {
    todos = [];
  }

  function addTodo(todoText){
    todos.push(item.create(todoText));
    refresh();
  }

  function removeTodo(todoId){
    var index = getTodoIndex(todoId);
    if(index !== -1){
      todos.splice(index, 1);
    }

    refresh();
  }

  function done(todoId){
    var index = getTodoIndex(todoId);
    if(index !== -1){
      todos[index].done = true;
    }
    save();
  }

  function undone(todoId){
    var index = getTodoIndex(todoId);
    if(index !== -1){
      todos[index].done = false;
    }
    save();
  }

  

  function refresh(){
    strArray = [];
    for (var i = todos.length - 1; i >= 0; i--) {
      strArray.push('<li data-id="' + todos[i].id + '" class="">');
      strArray.push('<div class="view">');
      if(todos[i].done){
        strArray.push('<input class="toggle" type="checkbox" checked>');
      } else {
        strArray.push('<input class="toggle" type="checkbox">');  
      }
      strArray.push('<label>' + todos[i].text + '</label>');  
      strArray.push('<button class="destroy"></button>');  
      strArray.push('</div>');  
      strArray.push('</li>');  
    }

    ul.innerHTML = strArray.join('');
    save();
  }
  
  // Hot reloading helpers
  function getTodos(){
    return todos;
  }

  function setTodos(newTodos){ // Reinitialise the currentId counter    
    todos = newTodos;
    refresh();
  }

  // Private
  function getTodoIndex(todoId){
    if (typeof(todoId) === 'object' && todoId.id != null){
      todoId = todoId.id;
    }
    todoId = parseInt(todoId, 10);

    for (var i = todos.length - 1; i >= 0; i--) {
      if(todos[i].id === todoId){
        return i;
      }
    };
    return -1;
  }

  function save(){
    localStorage["ecvd-todo"] = JSON.stringify(todos);
  }

  function load(){
    todos = JSON.parse(localStorage["ecvd-todo"]);

    var currentId = 0
    for (var i = todos.length - 1; i >= 0; i--) {
      currentId = Math.max(currentId, parseInt(todos[i].id, 10));
    };
    item.setCurrentId(currentId + 1);
  }

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    refresh: refresh,
    getTodos: getTodos,
    setTodos: setTodos,
    done: done,
    undone: undone
  }
}

module.exports = initTodo;


// Hot reloading
if(module.hot) {
  module.hot.accept("./item.js", function() {
    var currentId = item.getCurrentId();

    item = require("./item.js"); // We replace the application

    item.setCurrentId(currentId);
  });
}