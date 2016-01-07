function naiveSort(arr){
  // Write a naive solution here

  for (var j = 0; j < arr.length; j++) {
    for (var i = 0; i < arr.length-1; i++) {
      if(arr[i] > arr[i+1]) {
        var tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
      } 
    };
  };


  return arr;
}
// Naive complexity: n2







function optimizedSort(arr){
  // Write an optimized solution here
  return [];
}
// // Optimized complexity:






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
