function getNaiveDiviser(n){
  var diviser = [];

  var p = 1;
  for (var i = 1; i <= n; i++) {
     if(parseInt(n / i, 10) === n / i){
      diviser.push(i);
     }
  };
  return diviser;
}
// Complexity: n

function getOptimizedDiviser(n){
  var diviser = [];

  var p = 1;
  var sqrtn = Math.sqrt(n);
  for (var i = 1; i <= sqrtn; i++) {
     if(parseInt(n / i, 10) === n / i){
      diviser.push(i);
      if(i !== n / i){
        diviser.push(n/i);
      }
     }
  };
  return diviser;
}
// Complexity: sqrt(n)

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

