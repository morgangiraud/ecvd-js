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






    var _this = this;
    var todos = [];

    this.editAction = function(element, input, button) {
        var value = input.value;
        input.remove();
        button.remove();

        element.textContent = value;
    };

    this.editTodo = function(element) {

        console.log(document.querySelectorAll('li input').length);

        if(document.querySelectorAll('li input[type=text]').length === 0) {

            var input = document.createElement('input');
            input.type = 'text';
            input.value = element.textContent;

            element.textContent = "";

            element.appendChild(input);

            var validate = document.createElement('button');
            validate.textContent = "Edit";

            validate.onclick = function() {
                _this.editAction(element, input, this);
            };

            element.appendChild(validate);
        }  
    };

    this.removeTodo = function(element) {

        var indexToDelete = todos.indexOf(element.parentNode.textContent);
        if(indexToDelete > -1) todos.splice(indexToDelete,1);

        element.parentNode.remove();
        console.log('todos', todos);
    };

    this.addTodo = function() {
        if(document.querySelector('.new-todo').value !== '') {

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
            
            li.appendChild(button_delete);
            li.appendChild(toggle);

            document.querySelector('.todo-list').appendChild(li);
            document.querySelector('.new-todo').value = '';
        }
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

        if(e.which === 13) {
            _this.addTodo();
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
