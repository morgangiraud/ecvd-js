function todoList(){
  "strict"

  var todos = [];
  var list = document.querySelector("ul.todo-list");
  var newTodo = document.querySelector("input.new-todo");
  var id = 0;

  function refresh(){
    todo = "";
    for (var i = 0; i < todos.length; i++) {
      todo += '<li data-id="'+ todos[i].id +'" class="';
      if(todos[i].done){
        todo += 'completed';
      }
      todo += '" draggable="true"><div class="view">';
      if(todos[i].done){
        todo += '<input class="toggle" type="checkbox" checked>';
      } else {
        todo += '<input class="toggle" type="checkbox">';  
      }
      todo += '<label>'+ todos[i].content +'</label><button class="destroy"></button></div></li>';
    }
    list.innerHTML = todo;
  }

  function createTodo(data){
    todos.push({id: id, content: data});
    refresh();
    id ++;
  }
  newTodo.addEventListener("keypress", function(e){
    if(e.charCode === 13 && newTodo.value != ""){
      createTodo(newTodo.value);
      newTodo.value = "";
    }
  });

  function deleteTodo(id){
    id = parseInt(id, 10);
    for (var i = 0; i < todos.length; i++) {
      if(todos[i].id === id){
        todos.splice(i, 1);
      }
    };
    refresh();
  }
  list.addEventListener("click", function(e){
    if(e.target.nodeName === "INPUT" && e.target.className === "destroy"){
      deleteTodo(e.target.parentElement.parentElement.dataset.id);
    }
  });

  function completed(id){
    id = parseInt(id, 10);
    for (var i = 0; i < todos.length; i++) {
      if(todos[i].id === id){
        todos[id].done = true;
        var check = list.querySelector('li[data-id="' + id + '"]');
        check.className = "completed";
      }
    };
    refresh();
  }
  function uncomplet(id){
    id = parseInt(id, 10);
    for (var i = 0; i < todos.length; i++) {
      if(todos[i].id === id){
        todos[id].done = false;
        var uncheck = list.querySelector('li[data-id="' + id + '"]');
        uncheck.className = "";
      }
    };
    refresh();
  }
  list.addEventListener("click", function(e){
    if(e.target.nodeName === "INPUT" && e.target.className === "toggle"){
      if(e.target.checked){
        completed(e.target.parentElement.parentElement.dataset.id)
      } else {
        uncomplet(e.target.parentElement.parentElement.dataset.id)
      }
    }
  });

}
todoList();