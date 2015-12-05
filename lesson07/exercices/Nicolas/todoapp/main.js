// localStorage.clear();
if(localStorage.length == 0){
	localStorage.setItem('todos','[]');
}

var todos = JSON.parse(localStorage.todos);
var field = document.querySelector('.new-todo');
var list = document.querySelector('.todo-list');

function checkList(){
	if(todos.length != 0){
		for(var i = 0; i < todos.length; i++){
			var item = document.createElement('li');
			item.textContent = todos[i];
			list.appendChild(item);
		}
	}
}

function addItem(itemContent){
	todos.push(itemContent);
	localStorage.todos = JSON.stringify(todos);
}

function deleteItem(itemContent){
	for(var i = 0; i < todos.length; i++){
		if(itemContent == todos[i]){
			todos.splice(i,1);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function returnTodos(){
	return localStorage.todos;
}

checkList();

field.addEventListener('keypress', function (e){
	if(e.keyCode == 13 && field.value != ''){

		var item = document.createElement('li');
		item.textContent = field.value;
		// item.className = 'todo-item';
		list.appendChild(item);

		field.value = '';
		addItem(item.textContent);
	}
}, false);

list.addEventListener('click', function (e){
	var item = e.target;
	list.removeChild(item);

	deleteItem(item.textContent);
}, false);