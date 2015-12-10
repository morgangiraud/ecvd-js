module.exports = initTodo;

function initTodo() {

    // var Stock;

    // function eleMouseDown () {
    //     stateMouseDown = true;
    //     document.addEventListener ("mousemove" , eleMouseMove , false);
    // }

    // function eleMouseMove (ev) {
    //     var pX = ev.pageX;
    //     var pY = ev.pageY;
    //     Stock.style.left = pX + "px";
    //     Stock.style.top = pY + "px";
    //     document.addEventListener ("mouseup" , eleMouseUp , false);
    // }

    // function eleMouseUp () {
    //     document.removeEventListener ("mousemove" , eleMouseMove , false);
    //     document.removeEventListener ("mouseup" , eleMouseUp , false);
    // }




    var _this = this,
        todos = [];

    this.editTodo = function(li) {

        // On vérifie qu'un input n'existe pas déjà pour ne pas regénérer l'input si on double click dessus
        if(document.querySelectorAll('li input[type=text]').length === 0) {

            var input = document.createElement('input'),
                validate = document.createElement('button');

            input.type = 'text';
            input.value = li.textContent;

            old_value = li.textContent;

            // On reset le texte de l'input
            li.textContent = "";
            li.appendChild(input);
            
            // Edit
            validate.textContent = "Edit";

            validate.onclick = function() {

                var value = input.value;
                input.remove();
                this.remove();

                li.textContent = value;

                // On change dans le tableau
                var indexToUpdate = todos.indexOf(element.parentNode.textContent);
                if(indexToUpdate > -1) todos.splice(indexToUpdate,1);
            };

            li.appendChild(validate);
        }  
    };

    this.removeTodo = function(element) {

        var indexToDelete = todos.indexOf(element.parentNode.textContent);
        if(indexToDelete > -1) todos.splice(indexToDelete,1);

        element.parentNode.remove();
        console.log('todos', todos);
    };

    this.addTodo = function() {

        todos.push(document.querySelector('.new-todo').value);
        console.log('todos', todos);

        // Li
        var li = document.createElement('li');
        li.innerHTML = document.querySelector('.new-todo').value;

        // Delete
        var button_delete = document.createElement('button');
        button_delete.className = 'destroy';

        button_delete.onclick = function() {
            _this.removeTodo(this);
        };

        // Toggle
        var toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.className = 'toggle';

        toggle.onclick = function() {
            _this.checkTodo(this);
        };

        // Update function
        li.ondblclick = function() {
            _this.editTodo(this);
        };

        // Try Drag And Drop

        // Stock = li;
        // Stock.addEventListener ("mousedown" , eleMouseDown , false);
        
        li.appendChild(button_delete)
          .appendChild(toggle);

        document.querySelector('.todo-list').appendChild(li);
        document.querySelector('.new-todo').value = '';
    };

    this.checkTodo = function(element) {

        if(element.checked) {
            element.setAttribute('checked', 'checked');
        } else {
            element.removeAttribute('checked');
        }
    };

    // Add Todo
    document.querySelector('.new-todo').addEventListener('keypress', function(e) {
        e = e || window.event;

        // Lorsqu'on appuie sur entrée, on ajoute une tâche
        if(e.which === 13) {
            // On vérifie que la tâche rentrée ne soit pas vide
            if(document.querySelector('.new-todo').value !== '') _this.addTodo();
        }
    });
}


if(module.hot) {
    module.hot.accept("./item.js", function() {
        var currentId = item.getCurrentId();

        item = require("./item.js"); // We replace the application

        item.setCurrentId(currentId);
    });
}
