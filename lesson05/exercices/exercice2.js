function arrayToList(arr){
  var list = null;
  for (var i = arr.length - 1; i >= 0; i--) {
    last = list;
    list = {
      value: arr[i],
      next: last
    }
  };
  return list;
}

function listToArray(list){
  var arr = [];
  while(list != null){
    arr.push(list.value);
    list = list.next;
  }
  return arr;
}

var data = [2, "test", false, {"ref": 3}];
console.log(data);
console.log(listToArray(arrayToList(data)));