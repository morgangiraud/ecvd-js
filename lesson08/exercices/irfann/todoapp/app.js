function todoApp(){
	var todos = [];

	todos = JSON.parse(localStorage.todo);

	function addItem(item){
		todos.push(item);
		setLocalStorage();
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
		setLocalStorage();
	}

	function allTodo(){
		return todos;
	}

	function getLocalStorage(){
		if(JSON.parse(localStorage.todo).length > 0) {
			return JSON.parse(localStorage.todo);
		} else {
		    return 0;
		}
	}

	function setLocalStorage(){
		localStorage.todo = JSON.stringify(todos);
	}

	var object = {
		addItem:addItem,
		currentState:currentState,
		removeItem:removeItem,
		allTodo:allTodo,
		getLocalStorage: getLocalStorage
	}

	return object;
}

var todoapp = todoApp();
document.getElementsByClassName('todo-count')[0].innerHTML = 0;



window.addEventListener("load", function load(event){
	var todoList = document.getElementsByClassName("todo-list");
	var todos = todoapp.allTodo();
	todoList[0].innerHTML = "";

	for (var i = 0; i < todoapp.currentState(); i++) {
		todoList[0].innerHTML += "<li id='dropzone' draggable='true'><input class='toggle' type='checkbox'><label class='todo'>"+todos[i]+"</label><button class='destroy'></button></li>";
	};

  	document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();

  	if (document.querySelectorAll('#dropzone').length > 0) {

		var dragSrcEl = null;

		function handleDragStart(e) {
		  // Target (this) element is the source node.
		  dragSrcEl = e.target;

		  e.dataTransfer.effectAllowed = 'move';
		  e.dataTransfer.setData('text/html', e.target.outerHTML);
		}

		function handleDragOver(e) {
		  if (e.preventDefault) {
		    e.preventDefault(); // Necessary. Allows us to drop.
		  }

		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		  return false;
		}

		function handleDragEnter(e) {
		  // this / e.target is the current hover target.
		  this.classList.add('over');
		}

		function handleDragLeave(e) {
		  this.classList.remove('over');  // this / e.target is previous target element.
		}

		function handleDrop(e) {
		  // this/e.target is current target element.

		  if (e.stopPropagation) {
		    e.stopPropagation(); // Stops some browsers from redirecting.
		  }

		  // Don't do anything if dropping the same column we're dragging.
		  if (dragSrcEl != this) {
		    // Set the source column's HTML to the HTML of the column we dropped on.
		    dragSrcEl.outerHTML = this.outerHTML;
		    this.outerHTML = e.dataTransfer.getData('text/html');
		  }

		  return false;
		}

		function handleDragEnd(e) {
		  // this/e.target is the source node.

		  [].forEach.call(cols, function (col) {
		    col.classList.remove('over');
		  });
		}

		var cols = document.querySelectorAll('#dropzone');
		[].forEach.call(cols, function(col) {
		  col.addEventListener('dragstart', handleDragStart, false);
		  col.addEventListener('dragenter', handleDragEnter, false)
		  col.addEventListener('dragover', handleDragOver, false);
		  col.addEventListener('dragleave', handleDragLeave, false);
		  col.addEventListener('drop', handleDrop, false);
		  col.addEventListener('dragend', handleDragEnd, false);
		});

	};

},false);

document.querySelector('.new-todo').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
      	var t = [];

    if (key === 13) { 
    	var todoList = document.getElementsByClassName("todo-list");
    	var todo = document.getElementsByClassName('new-todo');
      	var todos = todoapp.addItem(todo[0].value);
      	todoList[0].innerHTML = "";

      	for (var i = 0; i < todoapp.currentState(); i++) {
      		todoList[0].innerHTML += "<li id='dropzone' draggable='true'><input class='toggle' type='checkbox'><label class='todo'>"+todos[i]+"</label><button class='destroy'></button></li>";
      	};

      	todo[0].value = "";

      	document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();

      	
		
    }
});


addEventListener('click', function (e){
	if(e.target.className == "destroy"){
		e.target.parentElement.remove();
		todoapp.removeItem(e.target.parentElement.childNodes[1].innerHTML);
		document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();
	}

	if(e.target.className == "toggle" && e.target.parentElement.className != "completed"){
		e.target.parentElement.classList.add("completed");
	}else{
		e.target.parentElement.classList.remove("completed");
	}
});
