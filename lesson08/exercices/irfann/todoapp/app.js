function todoApp() {
    var todos = [];

    try {
        todos = JSON.parse(localStorage.todo);
    } catch (error) {}

    function addItem(item) {
        todos.push({
            item: item,
            completed: 0
        });
        setLocalStorage();
        return todos;
    }

    function currentState() {
        return todos.length;
    }

    function removeItem(item) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].item == item) {
                todos.splice(i, 1);
            }
        };
        setLocalStorage();
    }

    function allTodo() {
        return todos;
    }

    function getTodoActive() {
        var todosActive = [];

        for (var i = 0; i < todos.length; i++) {
            if (todos[i].completed == 0) {
                todosActive.push(todos[i]);
            }
        };

        return todosActive;
    }

    function getTodoCompleted() {
        var todosActive = [];

        for (var i = 0; i < todos.length; i++) {
            if (todos[i].completed == 1) {
                todosActive.push(todos[i]);
            }
        };

        return todosActive;
    }

    function todoCompleted(item) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].item == item && todos[i].completed == 0) {
                todos[i].completed = 1;
            } else if (todos[i].item == item && todos[i].completed == 1) {
                todos[i].completed = 0;
            }
        };

        setLocalStorage();
    }

    function getLocalStorage() {
        if (JSON.parse(localStorage.todo).length > 0) {
            return JSON.parse(localStorage.todo);
        } else {
            return 0;
        }
    }

    function setLocalStorage() {
        localStorage.todo = JSON.stringify(todos);
    }

    var object = {
        addItem: addItem,
        currentState: currentState,
        removeItem: removeItem,
        allTodo: allTodo,
        getLocalStorage: getLocalStorage,
        todoCompleted: todoCompleted,
        getTodoActive: getTodoActive,
        getTodoCompleted: getTodoCompleted
    }

    return object;
}

var todoapp = todoApp();
document.getElementsByClassName('todo-count')[0].innerHTML = 0;

function display(todos) {
    var todoList = document.getElementsByClassName("todo-list");
    todoList[0].innerHTML = "";

    for (var i = 0; i < todoapp.currentState(); i++) {
        if (todos[i].completed == 1) {
            todoList[0].innerHTML += "<li id='dropzone' draggable='true' class='completed'><input class='toggle' type='checkbox' checked><label class='todo'>" + todos[i].item + "</label><button class='destroy'></button></li>";
        } else {
            todoList[0].innerHTML += "<li id='dropzone' draggable='true'><input class='toggle' type='checkbox'><label class='todo'>" + todos[i].item + "</label><button class='destroy'></button></li>";
        }
    };
}

document.querySelector('.all').addEventListener('click', function (e) {
    display(todoapp.allTodo());
});
document.querySelector('.active').addEventListener('click', function (e) {
    display(todoapp.getTodoActive());
});
document.querySelector('.completed').addEventListener('click', function (e) {
    display(todoapp.getTodoCompleted());
});

addEventListener('click', function (e) {
    try {
        if (e.target.className == "destroy") {
            e.target.parentElement.remove();
            todoapp.removeItem(e.target.parentElement.childNodes[1].innerHTML);
            document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();
        }

        if (e.target.className == "toggle" && e.target.parentElement.className != "completed") {
            e.target.parentElement.classList.add("completed");
            todoapp.todoCompleted(e.target.parentElement.childNodes[1].innerHTML);
        } else {
            e.target.parentElement.classList.remove("completed");
            todoapp.todoCompleted(e.target.parentElement.childNodes[1].innerHTML);
        }

    } catch (error) {}
});


window.addEventListener("load", function load(event) {
    var todos = todoapp.allTodo();

    display(todos);

    document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();

    if (document.querySelectorAll('#dropzone').length > 0) {

        var dragSrcEl = null;
        var completed = null;

        function handleDragStart(e) {
            // Target (this) element is the source node.
            dragSrcEl = e.target;
            if (e.target.classList.contains("completed")) {
                completed = 1;
            }
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.target.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

            return false;
        }

        function handleDragEnter(e) {
            // this / e.target is the current hover target.
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over'); // this / e.target is previous target element.
        }

        function handleDrop(e) {
            // this/e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
            }

            // Don't do anything if dropping the same column we're dragging.
            if (dragSrcEl != this) {
                // Set the source column's HTML to the HTML of the column we dropped on.

                if (completed == 1 && e.target.parentNode.classList.contains("completed") == false && dragSrcEl.classList.contains("completed")) {

                    e.target.parentNode.classList.add("completed");
                    dragSrcEl.classList.remove("completed");
                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.dataTransfer.getData('text/html');
                } else if (e.target.parentNode.classList.contains("completed") && dragSrcEl.classList.contains("completed") == false) {
                    e.target.parentNode.classList.remove("completed");
                    dragSrcEl.classList.add("completed");
                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.dataTransfer.getData('text/html');
                } else {

                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.dataTransfer.getData('text/html');
                }
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
		[].forEach.call(cols, function (col) {
            col.addEventListener('dragstart', handleDragStart, false);
            col.addEventListener('dragenter', handleDragEnter, false)
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('dragleave', handleDragLeave, false);
            col.addEventListener('drop', handleDrop, false);
            col.addEventListener('dragend', handleDragEnd, false);
        });

    };

}, false);

document.querySelector('.new-todo').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    var t = [];

    if (key === 13) {
        var todoList = document.getElementsByClassName("todo-list");
        var todo = document.getElementsByClassName('new-todo');
        var todos = todoapp.addItem(todo[0].value);
        todoList[0].innerHTML = "";

        for (var i = 0; i < todoapp.currentState(); i++) {
            todoList[0].innerHTML += "<li id='dropzone' draggable='true'><input class='toggle' type='checkbox'><label class='todo'>" + todos[i].item + "</label><button class='destroy'></button></li>";
        };

        todo[0].value = "";

        document.getElementsByClassName('todo-count')[0].innerHTML = todoapp.currentState();
    }
});


