function naiveSort(arr){
  var arr2 = [];
  var currentMin;
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    currentMin = arr[0];
    pivot = 0;
    for (var j = 0; j < arr.length; j++) {
      if(currentMin >= arr[j]){
        currentMin = arr[j];
        pivot = j;
      }
    }
    arr2.push(currentMin);
    arr.splice(pivot,1);
  }

  return arr2;
}
// Naive complexity: n!

function optimizedSort(arr){
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] - arr[j - 1] < 0) {
        var tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
    }
  }
  return arr;
}
// Optimized complexity: n^2



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