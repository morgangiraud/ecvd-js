function aPowerN(a, n){
  // Write your code here

  var power = 0;
  if(a==0 && n==0){
  	return 1
  }
  for (var i=1;i<=n;i++) {
	  	power = (a*a);
  };
  return power;
}
// Complexity: log(n)

// --------------------------------------------------------
// Check your algorithm

console.log(aPowerN(0, 0) === Math.pow(0, 0));
console.log(aPowerN(0, 1) === Math.pow(0, 1));
console.log(aPowerN(1, 8) === Math.pow(1, 8));
console.log(aPowerN(5, 12) === Math.pow(5, 12));
console.log(aPowerN(34567, 2) === Math.pow(34567, 2));