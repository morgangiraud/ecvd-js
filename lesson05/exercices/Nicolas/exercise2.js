// Write a function arrayToList that builds up a data structure
// like the previous one when given [1, 2, 3] as argument

var array = [1,2,3];

function arrayToList(array){
	var list = null;

	for(var i = array.length-1; i >= 0; i--){
		list = {value: array[i], next: list}
	}

	return list;  // Mais que renvois list ? La référence de l'objet ou le contenu de l'objet ?
}

var list = arrayToList(array);
console.log(list);

// write a listToArray function that produces an array from a list

function listToArray(list){
	var array = [];

	while(list != null){
		array.push(list.value);
		list = list.next;
	}

	return array;
}

var array = listToArray(list);
console.log(array);

// Run the following program and check that it returns true.

var data = [2, "test", false, {ref: 3}];
console.log(typeof data === typeof listToArray(arrayToList(data)));