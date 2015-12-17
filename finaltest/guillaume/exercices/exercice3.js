function naiveSort(arr){

  var sorted_array = [],
    inferior = null;
  
  // Pour la longueur du tableau
  for (var j = 0; j < arr.length; j++) {

    // On va chercher dans le tableau
    for (var i in arr) {

      if(inferior === null) inferior = arr[i];

      // Si le nombre est inférieur à ses prédécesseurs, on le nomme inferior
      if(arr[i] < inferior && sorted_array.indexOf(arr[i]) === -1) 
        inferior = arr[i];
    }

    if(sorted_array.indexOf(inferior) !== -1) inferior = inferior + 1;
    sorted_array.push(inferior);
  }

  return sorted_array;
}
// Naive complexity: arr.length cube 
// à cause du indexOf mais la structure du arr.slice(index) m'échappait

function optimizedSort(arr) {

  var sorted_array = arr,
    done = true;

  for (var i = 0; i < sorted_array.length; i++) {

    if(sorted_array[i] > sorted_array[i+1]) {
      var tmp = sorted_array[i];
      sorted_array[i] = sorted_array[i+1];
      sorted_array[i+1] = tmp;

      done = false;
      break;
    }
  }

  if(done) {
    console.log('sorted', sorted_array);
    return sorted_array;
  } else {
    optimizedSort(sorted_array);
  }
}
// Optimized complexity: log de arr.length ? pas pu vérifier, b est undefined alors que je retourne bien le tableau et qu'il se console log bien avant le return...


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
