function range(start, end) {
	var array = [];
	for (var i = 0; i <= end; i++) array.push(i);
	return array;
}

function sum(array) {
	var all = 0;
	for (var j = 0; j < array.length; j++) all += array[j];
	return all;
}

//console.log(sum(range(0, 10)));













Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    return size;
};




function arrayToList(array) {
	var myObject = {};

	for (var i = 0; i < array.length; i++) {

		myObject[i] = {};

		if(typeof array[i] !== 'undefined') {
			myObject[i].value = array[i];
		} else {
			myObject[i].value = array[i];
		}
	}

	return myObject;
}

function listToArray(list) {
	var myArray = [];

	for (var i = 0; i < Object.size(list); i++) {

		if(typeof list[i].value === 'object') {

			for(var key in list[i]) {
				myArray[i] = list[i][key];
			}

		} else {
			myArray[i] = list[i].value;
		}
	}
	return myArray;
}

var data = [2, "test", false, {"ref": 3}];
console.log('firstList', data);
console.log('result', listToArray(arrayToList(data)));

// console.log(data === arrayToList(listToArray(data)));

