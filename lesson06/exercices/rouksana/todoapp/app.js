function todoList(){
  "strict"

  var todos = [];
  var list = document.querySelector("ul.todo-list");
  var newTodo = document.querySelector("input.new-todo");
  var id = 0;

  function refresh(){
    todo = "";
    for (var i = 0; i < todos.length; i++) {
      todo += '<li data-id="'+ todos[i].id +'" class=""><div class="view"><label>'+ todos[i].content +'</label><button class="destroy"></button></div></li>';
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
    if(e.target.nodeName === "BUTTON" && e.target.className === "destroy"){
      deleteTodo(e.target.parentElement.parentElement.dataset.id);
    }
  });

}
todoList();