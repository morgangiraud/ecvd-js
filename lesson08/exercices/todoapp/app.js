var item = require('./item.js')

function initTodo(){
  "strict"

  var dbName = "ecvd-todo";
  var todos;
  var ul = document.querySelector("ul.todo-list");
  var filters = document.querySelector("ul.filters");

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
    var todo = item.create(todoText);
    if( /completed/.test(document.querySelector(".filters .selected").href)){
      todo.visible = false;
    }
    todos.push(todo);
    refresh();
  }

  function swapTodos(todoId, switchId){
    var index = getTodoIndex(todoId);
    var swappedIndex = getTodoIndex(switchId);
    if(index !== -1 && swappedIndex !== -1){
      var swappedTodo = todos[swappedIndex];
      todos.splice(swappedIndex, 1, todos[index]);
      todos.splice(index, 1, swappedTodo);
      save();
    }
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
      var node = ul.querySelector("li[data-id=\"" + todoId + "\"]");
      node.className = "completed";
    }
    save();
  }

  function undone(todoId){
    var index = getTodoIndex(todoId);
    if(index !== -1){
      todos[index].done = false;
      var node = ul.querySelector("li[data-id=\"" + todoId + "\"]");
      node.className = "";
    }
    save();
  }

  function refresh(){
    strArray = [];
    for (var i = todos.length - 1; i >= 0; i--) {
      if(todos[i].visible){
        strArray.push('<li data-id="' + todos[i].id + '" class="' + (todos[i].done ? "completed" : "") + '" draggable="true">');
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
    }

    ul.innerHTML = strArray.join('');
    var $lis = ul.querySelectorAll('li')
    for (var i = $lis.length - 1; i >= 0; i--) {
      $lis[i].addEventListener("drag", function(e){
        if(e.clientX !== 0 && e.clientY !== 0){ //When you release the drag this event is called one last time
          if(this.previousSibling && e.offsetY < 0){
            swap(this, "before");
          }
          if(this.nextSibling && e.offsetY > this.getBoundingClientRect().height){
            swap(this, "after");
          }
        }
      });
    };
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
      todos[i].visible = true; //The app start with the all selector on
    };
    item.setCurrentId(currentId + 1);
  }

  function swap(elem, type){
    switch(type){
      case "after":
        swapTodos(elem.getAttribute("data-id"), elem.nextSibling.getAttribute("data-id"));
        elem.parentNode.insertBefore(elem.nextSibling, elem);
        break;
      case "before":
      default:
        swapTodos(elem.getAttribute("data-id"), elem.previousSibling.getAttribute("data-id"));
        elem.parentNode.insertBefore(elem,elem.previousSibling);
        break;
    }
  }

  function show(type) {
    for (var i = todos.length - 1; i >= 0; i--) {
      switch(type){
        case "active":
          if(todos[i].done === false){
            todos[i].visible = true;
          } else {
            todos[i].visible = false;
          }
          break;
        case "completed":
          if(todos[i].done === true){
            todos[i].visible = true;
          } else {
            todos[i].visible = false;
          }
          break;
        case "all":
        default:
          todos[i].visible = true;
          break;
      }
    };
    refresh();
  }

  function clearCompleted(){
    for (var i = todos.length - 1; i >= 0; i--) {
      if(todos[i].done){
        todos.splice(i, 1);
      }
    };
    refresh();
  }

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    refresh: refresh,
    getTodos: getTodos,
    setTodos: setTodos,
    done: done,
    undone: undone,
    show: show,
    clearCompleted: clearCompleted
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