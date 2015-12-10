function todoApp(){
	var todos = [];

	function addItem(item){
		todos.push(item);
		return todos;
	}

	function currentState(){
		return todos.length;
	}

	function removeItem(item){
		for (var i = 0; i < todos.length; i++) {
			if(todos[i] == item){
				todos.splice(i, 1);
			}
		};
	}

	function allTodo(){
		return todos;
	}

	var object = {
		addItem:addItem,
		currentState:currentState,
		removeItem:removeItem,
		allTodo:allTodo
	}

	return object;
}

var todoapp = todoApp();

document.getElementsByClassName('todo-count')[0].innerHTML = 0;

document.querySelector('.new-todo').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
    	var todoList = document.getElementsByClassName("todo-list");
    	var todo = document.getElementsByClassName('new-todo');
      	var todos = todoapp.addItem(todo[0].value);
      	todoList[0].innerHTML = "";
      	for (var i = 0; i < todoapp.currentState(); i++) {
      		todoList[0].innerHTML += "<li><span class='todo'>"+todos[i]+"</span><span class='destroy'></span></li>";
      	};

      	todo[0].value = "";
      	document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();
    }
});

addEventListener('click', function (e){
	if(e.target.className == "destroy"){
		e.target.parentElement.remove();
		todoapp.removeItem(e.target.parentElement.childNodes[0].innerHTML);
		document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();
	}
});



