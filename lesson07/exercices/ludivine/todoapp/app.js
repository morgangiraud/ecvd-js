document.querySelector(".new-todo").addEventListener("keypress", function(event) {

	if (event.keyCode==13){

		var list = document.createElement("li"); 
		var label = document.createElement("label"); 
		var itemList = document.createTextNode(document.getElementsByClassName("new-todo")[0].value);
		label.appendChild(itemList);
		list.appendChild(label);
		var done = document.createElement("input");
		done.classList.add("toggle");
		done.setAttribute("type", "checkbox");
		list.appendChild(done);


		document.getElementById("todo-list").appendChild(list);

		var dlt = document.createElement("button");
		dlt.classList.add("destroy");
		list.appendChild(dlt);
	}
})

addEventListener("click", function(event) {


	if(event.target.className == "destroy"){

		event.target.parentElement.remove();
	}

	if (event.target.className == "toggle" && event.target.parentElement.className != "completed") {

			event.target.parentElement.classList.add("completed");
	}

	else {

			event.target.parentElement.classList.remove("completed");
	}
});

var dropper = document.querySelector(".draggable").addEventListener('dragstart', function(event) {

	var drag = document.createElement('draggable');


})


function main() {


		var todos = [];

		function addItem(itemList) {

		   		todos.push(itemList);
		   		return todos;
		    }

	function currentState() {

		return todos.length;
	}

	function deleteItem(itemList) {


			for (i = 0; i<=todos.length; i++) {

				todos.splice(itemList, 1);
				return todos;
			}
		}	



	function getTodo() {

		return todos;
	}

	return {

		firstClosure: addItem,
		secondClosure: deleteItem,
		thirdclosure: getTodo
	}
}
var a = main();
a.firstClosure;
a.secondClosure;
a.thirdclosure;