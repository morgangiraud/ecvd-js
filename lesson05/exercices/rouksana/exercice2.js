// EXERCICE 2

var list = {
  value: 1, 
  next: {
    value: 2, 
    next: {
      value: 3,
      next: null 
    }
  } 
};

function arrayToList(array) {
    var list;
    for (var i = array.length - 1; i >= 0 ; i--) {
      next = list;
      list = {value: array[i], next: next}
    };
    return list;
}

function listToArray(list) {
  var array = [];
  while(list != null){
    array.push(list.value);
    list = list.next;
  }
  return array;
}

var data = [2, "test", false, {"ref": 3}];
console.log(data);
console.log(listToArray(arrayToList(data)));