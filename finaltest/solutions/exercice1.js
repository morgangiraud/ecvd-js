function aPowerN(a, n){
  if(n === 0){
    return 1;
  }
  if(a === 0){
    return 0;
  }

  var p = 1;
  for (var i = 0; i < n; i++) {
     p *= a;
  };

  return p;
}
// Complexity:

// --------------------------------------------------------
// Check your algorithm
console.log(aPowerN(0, 0) === Math.pow(0, 0));
console.log(aPowerN(0, 1) === Math.pow(0, 1));
console.log(aPowerN(1, 8) === Math.pow(1, 8));
console.log(aPowerN(5, 12) === Math.pow(5, 12));
console.log(aPowerN(34567, 2) === Math.pow(34567, 2));