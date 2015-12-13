if(localStorage.length == 0){
	localStorage.setItem('todos','[]');
}

var savedTextContent = null;
var todos = JSON.parse(localStorage.todos);
var input = document.querySelector('.new-todo');
var ul = document.querySelector('.todo-list');

function addItem(textContent){
	todos.push(textContent);
	localStorage.todos = JSON.stringify(todos);
}

function deleteItem(textContent){
	for(var i = 0; i < todos.length; i++){
		if(textContent == todos[i]){
			todos.splice(i,1);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function returnTodos(){
	return localStorage.todos;
}

function addEvents(li,span){
	button.addEventListener('click', function (){
		ul.removeChild(li);
		deleteItem(span.textContent);
	}, false);
}

if(todos.length != 0){
	for(var i = 0; i < todos.length; i++){
		var li = document.createElement('li');
		var span = document.createElement('span');
		var button = document.createElement('button');

		span.textContent = todos[i];
		button.textContent = 'x';
		addEvents(li,span);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);
	}
}

input.addEventListener('keypress', function (e){
	if(e.keyCode == 13 && input.value != ''){
		var li = document.createElement('li');
		var span = document.createElement('span');
		var button = document.createElement('button');

		span.textContent = input.value;
		span.addEventListener('dblclick', function (){
			span.contentEditable = true;
			span.focus();
			savedTextContent = span.textContent;
		}, false);

		span.addEventListener('keypress', function (e){
			if(e.keyCode == 13 && span.textContent != ''){
				span.contentEditable = false;
				if(span.textContent != savedTextContent){
					console.log(span.textContent);
					console.log(savedTextContent);
				}
			}
		}, false);

		button.textContent = 'x';
		button.addEventListener('click', function (){
			ul.removeChild(li);
			deleteItem(span.textContent);
		}, false);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);

		input.value = '';
		addItem(span.textContent);
	}
}, false);
