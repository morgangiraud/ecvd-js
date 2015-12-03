function range (start, end){
  var values = [];
  for(var i = start; i <= end; i++){
    values.push(i);
  }
  return values;
};

function sum(arr) {
  var sum = 0;
  for(var i = arr.length - 1; i >= 0; --i){
    sum += arr[i];
  }
  return sum
}
console.log(sum(range(1, 10)));