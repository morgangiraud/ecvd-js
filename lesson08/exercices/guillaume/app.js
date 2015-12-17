module.exports = initTodo;

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

function offset(elt) {
    var rect = elt.getBoundingClientRect(), bodyElt = document.body;
    return {
        top: rect.top + bodyElt .scrollTop,
        left: rect.left + bodyElt .scrollLeft
    }
}

function initTodo() {

    var drag_target = '',
        clicking = false,
        previous_top,
        first_top,
        _this = this,
        todos = [];

    this.getUpElement = function() {
        var all_li = document.querySelectorAll('li'),
            upElem = '';

        for (var i = 0; i < all_li.length; i++) {

            if(offset(all_li[i]).top > offset(drag_target).top) {
                // Si un element est plus haut que le drag

                // Si c'est le premier element plus haut, il devient upElem
                if(upElem === '') {
                    upElem = all_li[i];

                // Sinon, on regarde si il est plus bas que upElem . Si oui, il devient upElement
                } else {
                    if(offset(all_li[i]).top < offset(upElem).top) {
                        upElem = all_li[i];
                    }
                }
            }
        }

        if(upElem !== '') return upElem;
        return false;
    };

    this.getBottomElement = function() {
        var all_li = document.querySelectorAll('li'),
            bottomElem = '';

        for (var i = 0; i < all_li.length; i++) {

            if(offset(all_li[i]).top < offset(drag_target).top) {
                // Si un element est plus haut que le drag

                // Si c'est le premier element plus haut, il devient bottomElem
                if(bottomElem === '') {
                    bottomElem = all_li[i];

                // Sinon, on regarde si il est plus bas que bottomElem . Si oui, il devient bottomElement
                } else {
                    if(offset(all_li[i]).top > offset(bottomElem).top) {
                        bottomElem = all_li[i];
                    }
                }
            }
        }

        if(bottomElem !== '') return bottomElem;
        return false;
    };

    document.addEventListener('mousedown', function(e) {

        if(e.target.localName === 'li') {

            drag_target = e.target;
            clicking = true;

            drag_target.classList.add('moving');
            first_top = e.clientY;
            // drag_target.style.top = (e.clientY-20) + 'px';

            console.log('mousedown');
        }
    });

    document.addEventListener('mousemove', function(e) {
        if(!clicking) return;

        e=e || window.event;
        pauseEvent(e);


        drag_target.style.top = parseInt(drag_target.style.top.slice(0, -2)) + (first_top - e.clientY) + 'px';

        console.log(drag_target.style.top);

        previous_top = offset(drag_target).top;
    });

    document.addEventListener('mouseup', function(e) {

        if(drag_target === '') return;

        if(clicking) {

            if(offset(drag_target).top > previous_top) {
                // Il descend

                var bottomElem = _this.getBottomElement();

                if(bottomElem !== false) {
                    var currentOrder = drag_target.style.order;
                    drag_target.style.order = bottomElem.style.order;

                    bottomElem.style.order = currentOrder;
                } else {
                    console.log(bottomElem);
                }

            } else {
                // Il monte

                var upElem = _this.getUpElement();

                if(upElem !== false) {
                    var currentOrder = drag_target.style.order;
                    drag_target.style.order = upElem.style.order;

                    upElem.style.order = currentOrder;
                } else {
                    console.log(upElem);
                }

            }

            drag_target.style.top = '0px';
            drag_target.classList.remove('moving');
            drag_target = '';
        }

        clicking = false;
    });

    

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
        li.style.order = todos.length;

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
