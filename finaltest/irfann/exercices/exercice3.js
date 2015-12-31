function naiveSort(arr){
  // Write a naive solution here
  var temp;
  var a = 0;
  console.log("taille: ", arr);


    for (var i = 0; i < arr.length; i++) {
      for (var j = i; j < arr.length;j++) {
        if(arr[i]>arr[j+1]){
          temp = arr[i];
          arr[i]=arr[j+1];
          arr[j+1]=temp;
        }
      };
      console.log(arr);
    };
  return arr;
}
// Naive complexity: log(n)^2

function optimizedSort(arr){
  // Write an optimized solution here
  return arr.sort();
}
// Optimized complexity:




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
  console.log(a)
  return (b.length == a.length) && a.every(function(element, index) {
      return element === b[index]; 
  });
}
console.log("Checking naive solution");
for(var i = 0; i < 20; i++){
  console.log(check(naiveSort));
}
// console.log("Checking optimized solution");
// for(var i = 0; i < 20; i++){
//   console.log(check(optimizedSort));
// }
