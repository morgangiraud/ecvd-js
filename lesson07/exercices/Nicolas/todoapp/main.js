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
			var button = document.createElement('button');

			item.textContent = todos[i];

			list.appendChild(item);
			item.appendChild(button);

			button.addEventListener('click', function (e){
				var item = e.target.parentNode;
				list.removeChild(item);

				deleteItem(item.textContent);
			}, false);
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
		var button = document.createElement('button');

		item.textContent = field.value;

		list.appendChild(item);
		item.appendChild(button);

		field.value = '';
		addItem(item.textContent);

		button.addEventListener('click', function (e){
			var item = e.target.parentNode;
			list.removeChild(item);

			deleteItem(item.textContent);
		}, false);
	}
}, false);