"use strict";

if(localStorage.length == 0){
	localStorage.setItem('todos','[]');
}

var i = 0;
var saveValue = null;
var triggerKeypressEvent = false;
var todos = JSON.parse(localStorage.todos);
var input = document.querySelector('.new-todo');
var ul = document.querySelector('.todo-list');
var li = null;
var span = null;
var button = null;

function addItem(value){
	todos.push(value);
	localStorage.todos = JSON.stringify(todos);
}

function editableItem(value){
	for(i = 0; i < todos.length; i++){
		if(saveValue == todos[i]){
			todos.splice(i,1,value);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function removeItem(value){
	for(i = 0; i < todos.length; i++){
		if(value == todos[i]){
			todos.splice(i,1);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function checkValue(value){
	var error = false;
	for(i = 0; i <= todos.length; i++){
		if(value == todos[i] || value == ''){
			error = true;
		}
	}
	return error;
}

function addEvents(li,span,button){
	span.addEventListener('dblclick',function (){
		button.style.display = 'none';
		span.contentEditable = true;
		span.focus();
		saveValue = span.textContent;
	},false);

	span.addEventListener('keypress',function (e){
		if(e.keyCode == 13 && !checkValue(span.textContent)){
			triggerKeypressEvent = true;
			span.contentEditable = false;
			button.style.display = 'block';
			editableItem(span.textContent);
		} else if(e.keyCode == 13 && checkValue(span.textContent)){
			triggerKeypressEvent = true;
			span.contentEditable = false;
			button.style.display = 'block';
			span.textContent = saveValue;
		}
	},false);

	span.addEventListener('blur',function (){
		if(!triggerKeypressEvent){
			if(!checkValue(span.textContent)){
				span.contentEditable = false;
				button.style.display = 'block';
				editableItem(span.textContent);
			} else{
				span.contentEditable = false;
				button.style.display = 'block';
				span.textContent = saveValue;
			}
		} else{
			triggerKeypressEvent = false;
		}
	},false);
	
	button.addEventListener('click',function (){
		ul.removeChild(li);
		removeItem(span.textContent);
	},false);
}

if(todos.length != 0){
	for(i = 0; i < todos.length; i++){
		li = document.createElement('li');
		span = document.createElement('span');
		button = document.createElement('button');

		span.textContent = todos[i];
		addEvents(li,span,button);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);
	}
}

input.addEventListener('keypress',function (e){
	if(e.keyCode == 13 && !checkValue(input.value)){
		li = document.createElement('li');
		span = document.createElement('span');
		button = document.createElement('button');

		span.textContent = input.value;
		addEvents(li,span,button);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);

		input.value = '';
		addItem(span.textContent);
	}
},false);