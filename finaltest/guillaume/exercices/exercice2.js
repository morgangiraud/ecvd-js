function getNaiveDiviser(n){
  var diviser = [];

  for (var i = 0; i <= n; i++) {
  	if(n % i === 0) diviser.push(i);
  }

  return diviser;
}
// Complexity: n

function getOptimizedDiviser(n){
  var diviser = [];

  for (var i = 0; i <= n/2; i++) {

  	if(n % i === 0) {
  		diviser.push(i);
  	} else if(n % (i + (n/2)) === 0) {
  		diviser.push(i);
  	}
  }

  return diviser;
}
// Complexity: n/2

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
