var field = document.querySelector('.new-todo');
var list = document.querySelector('.todo-list');

field.addEventListener('keypress', function (e){
	if(e.keyCode == 13 && field.value != ''){

		var item = document.createElement('li');
		item.textContent = field.value;
		item.className = 'todo-item';
		list.appendChild(item);

		field.value = '';
	}
}, false);

list.addEventListener('click', function (e){
	var item = e.target;
	list.removeChild(item);
}, false);