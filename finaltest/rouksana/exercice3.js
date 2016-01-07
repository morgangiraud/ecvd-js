function naiveSort(arr){
  for (var i = 0; i < arr.length-1; i++) {
    var current = arr[i];
    var j = i;
    
    while (arr[j-1] > current) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }
  return arr;
}
// Naive complexity: 

function optimizedSort(arr){
  arr.sort(
    function(a, b){
      return a-b;
    }
  )
  return arr;
}
// Optimized complexity: log(n)

// --------------------------------------------------------
// Check your algorithm
function check(sort){
  function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  var a = [];
  for (var i = 0; i < 10; i++) {
    a.push(i);
  };  
  var b = sort(shuffle(a));

  a = [];
  for (var i = 0; i < 10; i++) {
    a.push(i);
  };  
  
  return (b.length == a.length) && a.every(function(element, index) {
      return element === b[index]; 
  });
}
console.log("Checking naive solution");
for(var i = 0; i < 20; i++){
  console.log(check(naiveSort));
}
console.log("Checking optimized solution");
for(var i = 0; i < 20; i++){
  console.log(check(optimizedSort));
}


// var test = [6,2,8,4]; 
// console.log(naiveSort(test));
// console.log(optimizedSort(test));
