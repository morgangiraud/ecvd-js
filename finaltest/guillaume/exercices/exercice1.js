function aPowerN(a, n) {
	var result = a;

	if(n === 0 && a === 0) result = 1;
	for (var i = 0; i < n-1; i++) result = result * a;

	return result;
}
// Complexity: n

// --------------------------------------------------------
// Check your algorithm

console.log(aPowerN(0, 0) === Math.pow(0, 0));
console.log(aPowerN(0, 1) === Math.pow(0, 1));
console.log(aPowerN(1, 8) === Math.pow(1, 8));
console.log(aPowerN(5, 12) === Math.pow(5, 12));
console.log(aPowerN(34567, 2) === Math.pow(34567, 2));
