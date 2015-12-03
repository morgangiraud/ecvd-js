// EXERCICE 1
function range(start, end){ 
  var myArray = [];
  for (var i = start; i <= end; i++) {
    myArray.push(i);
  };
  return myArray;
}
console.log(range(1,10));

function sum(array){
  var result = 0;
  for (var i = 0; i < array.length; i++) {
      result += array[i];
  }
  return result;
}

console.log(sum(range(1,10)));
