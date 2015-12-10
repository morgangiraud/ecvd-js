var counter = 0,
    tasks = [{
        id: 1,
        value: 'yooooo',
        completed: false
    }, {
        id: 2,
        value: 'tony',
        completed: false
    }, {
        id: 3,
        value: 'test',
        completed: false
    }, {
        id: 4,
        value: 'coucou',
        completed: false
    }],
    input = document.getElementsByTagName("input")[0],
    todoList = document.getElementsByClassName('todo-list')[0],
    taskElements = todoList.getElementsByTagName('li'),
    destroyButtons = document.getElementsByClassName('destroy');

updateTasks();

function destroyTask(taskId) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            tasks.splice(i, 1);
            break;
        }
    }
    updateTasks();
}

function toggleComplete(taskId) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    updateTasks();
}

function updateTasks() {
    todoList.innerHTML = '';
    tasks.forEach(function (task) {

        var li = document.createElement("li");
        if (task.completed)
            li.setAttribute("class", 'completed');

        li.setAttribute("data-id", task.id);

        if (task.completed)
            li.innerHTML = '<input class="toggle" type="checkbox" checked>';
        else
            li.innerHTML = '<input class="toggle" type="checkbox">';

        li.innerHTML += '<label>' + task.value + '</label>';

        var destroyButton = document.createElement("button");
        destroyButton.setAttribute("class", "destroy");
        destroyButton.setAttribute("data-id", task.id);
        li.appendChild(destroyButton);
        todoList.appendChild(li);

    });

    for (var i = 0; i < destroyButtons.length; i++) {
        destroyButtons[i].setAttribute("onclick", "destroyTask(" + destroyButtons[i].getAttribute('data-id') + ")");
    }

    for (var i = 0; i < taskElements.length; i++) {
        taskElements[i].setAttribute("onclick", "toggleComplete(" + taskElements[i].getAttribute('data-id') + ")");
    }
}

input.addEventListener('keydown', function (event) {
    if ((event.which == 13 || event.keyCode == 13) && input.value != "") {

        counter++;
        tasks.push({
            id: counter,
            value: input.value,
            completed: false
        });
        updateTasks();
        input.value = "";


    }
});