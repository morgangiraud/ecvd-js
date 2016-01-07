var item = require('./item.js')

function initTodo(){
  "strict"

  var dbName = "ecvd-todo";
  var todos = [];
  var ul = document.querySelector("ul.todo-list");
  var filters = document.querySelector("ul.filters");

  function addTodo(todoText){
    todos.push(item.create(todoText));
    refresh();
  }

  function swapTodos(todoId, switchId){
    var index = getTodoIndex(todoId);
    var swappedIndex = getTodoIndex(switchId);
    if(index !== -1 && swappedIndex !== -1){
      var swappedTodo = todos[swappedIndex];
      todos.splice(swappedIndex, 1, todos[index]);
      todos.splice(index, 1, swappedTodo);
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
  }

  function undone(todoId){
    var index = getTodoIndex(todoId);
    if(index !== -1){
      todos[index].done = false;
      var node = ul.querySelector("li[data-id=\"" + todoId + "\"]");
      node.className = "";
    }
  }

  function refresh(){
    strArray = [];
    for (var i = todos.length - 1; i >= 0; i--) {
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