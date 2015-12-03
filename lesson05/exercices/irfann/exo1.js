function range(start,end){
	var myArray = [];

	for (var i = start; i <= end; i++) {
		myArray.push(i);
	}
	

	return myArray;
}

function sum(array){
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		sum += array[i];
	};
	return sum;
}

console.log(sum(range(1, 10)));