// Write a range function that takes two arguments, start and end,
// and returns an array containing all the numbers from start up
// to (and in-cluding) end.

function range(start,end){
	var array = [];

	for(var i = start; i <= end; i++){
		array.push(i);
	}

	return array;
}

array = range(10,20);
console.log(array);

// Next, write a sum function that takes an array of numbers and
// returns the sum of these numbers.

function sum(array){
	var result = null;

	for(var i = 0; i < array.length; i++){
		result += array[i];
	}
	
	return result;
}

var result = sum([20,30,50]);
console.log(result);

// Run the following program and check that it displays 55.

console.log(sum(range(1, 10)));