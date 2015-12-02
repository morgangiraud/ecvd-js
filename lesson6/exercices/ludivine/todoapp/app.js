document.querySelector(".new-todo").addEventListener("keypress", function(event) {

	if (event.keyCode==13){

		var list = document.createElement("li"); 
		var itemList = document.createTextNode(document.getElementsByClassName("new-todo")[0].value);
		list.appendChild(itemList);
		document.getElementById("todo-list").appendChild(list);

		var dlt = document.createElement("span");
		dlt.classList.add("destroy");
		list.appendChild(dlt);
	}
})

addEventListener("click", function(event) {


	if(event.target.className == "destroy"){

		event.target.parentElement.remove();
	}
});

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

