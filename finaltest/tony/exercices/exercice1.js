function aPowerN(a, n){

	var res = a;

	if(n === 0) {
		res = 1;
	} else {
		for (var i = 1; i < n; i++) {
			res *=  a;
		};
	}

	return res;
}


// Complexity: n


// --------------------------------------------------------
// Check your algorithm

console.log(aPowerN(0, 0) === Math.pow(0, 0));
console.log(aPowerN(0, 1) === Math.pow(0, 1));
console.log(aPowerN(1, 8) === Math.pow(1, 8));
console.log(aPowerN(5, 12) === Math.pow(5, 12));
console.log(aPowerN(34567, 2) === Math.pow(34567, 2));