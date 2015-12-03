var todos = [];
var field = document.querySelector('.new-todo');
var list = document.querySelector('.todo-list');

function addItem(itemContent){
	todos.push(itemContent);
	console.log(todos);
}

function deleteItem(itemContent){
	for(var i = 0; i < todos.length; i++){
		if(itemContent == todos[i]){
			todos.splice(i,1);
		}
	}
	console.log(todos);
}

function returnTodos(){
	return todos;
}

field.addEventListener('keypress', function (e){
	if(e.keyCode == 13 && field.value != ''){

		var item = document.createElement('li');
		item.textContent = field.value;
		item.className = 'todo-item';
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