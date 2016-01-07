function getNaiveDiviser(n){ // 3
	var diviser = [];

	for (var i = n; i > 0; i--) { // 3 // 2 // 1
		if (n % i == 0){ // 3 // non // 1
			diviser.push(i); // 3 // 1
		}
	}
	diviser.sort();
	return diviser; // 3 // 1
}
// Complexity: n 

function getOptimizedDiviser(n){ // 8
	var diviser = [];

	var racine = Math.floor( Math.sqrt(n) ); // 2,8284 -> 2

	for (var i = 1; i <= racine; i++) { // 1 // 2
		if (n % i == 0){ // 8/1 -> reste = 0 // 8/2 -> reste = 0
			diviser.push(i); // 1 // 2 
			if (i * i != n) { // 1*1 = 1 // 2*2 = 4
				diviser.push(n/i); // 8 // 4 
			}
		}
	}
	diviser.sort();
 	return diviser; // 1 // 8 // 2 // 4
}
// Complexity: racine de n

// --------------------------------------------------------
// Check your algorithm
console.log(getNaiveDiviser(0).length === 0);
console.log(getNaiveDiviser(1).length === 1);
console.log(getNaiveDiviser(8).length === 4);
console.log(getNaiveDiviser(120).length === 16);
console.log(getNaiveDiviser(12345679).length === 4);

console.log(getOptimizedDiviser(0).length === 0);
console.log(getOptimizedDiviser(1).length === 1);
console.log(getOptimizedDiviser(8).length === 4);
console.log(getOptimizedDiviser(120).length === 16);
console.log(getOptimizedDiviser(12345679).length === 4);

// console.log(getNaiveDiviser(8));
// console.log(getOptimizedDiviser(8));

// 5
// 5/5 -> reste 0
// => 5
// 5/4 -> reste 1
// 5/3 -> reste 2 
// 5/2 -> reste 1
// 5/1 -> reste 0
// => 1

// 5
// 2,2360 -> 2
// 5/1 -> reste = 0 
// => 1 
// 1*1 = 1 
// => 5 
// 5/2 -> reste = 1
// 1 // 5 