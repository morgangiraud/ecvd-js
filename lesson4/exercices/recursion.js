// NFE recursion
function power(base, exponent) { 
  if (exponent == 0){
    return 1;    
  }
  return base * power(base, exponent - 1);
}
console.log(power(2,3));

// Anon recursion
var power2 = function (base, exponent) { 
  if (exponent == 0){
    return 1;    
  } else{
    return base * power2(base, exponent - 1);
  }
}
console.log(power2(2,3));