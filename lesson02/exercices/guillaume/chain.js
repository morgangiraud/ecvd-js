function loopSize(node){

  var the_node = node,
    i = 0,
    tab = [];
  
  // On boucle en vérifiant si le tableau ne contient pas le noeud
  while(tab.indexOf(the_node) == -1) {
    // Si non, on ajoute le noeud au tableau
    tab[i] = the_node;

    // On passe au noeud suivant
    the_node = the_node.next;
    i = i + 1;
  }

  // On retourne le nombre de fois où on a bouclé moins l'offset du noeud retrouvé pour renvoyer la taille de la loop
  return i - tab.indexOf(the_node);
}

// Testing environment
function createChain(tailLength, loopLength){
  list = [];
  for(i=0; i < tailLength + loopLength; i++){
    list.push({ next: null });
    if(i > 0){
      list[i-1].next = list[i];
    }
  }
  list[tailLength + loopLength - 1].next = list[tailLength];

  return list[0];
}

// Test 1
var list = createChain(0, 1);
var result = loopSize(list)
if(result != 1){
  console.log("Test 1: Expected 1 got " + result)
} else {
  console.log("Test 1: success");
}

//Test 2
list = createChain(8778, 23);
result = loopSize(list)
if(result != 23){
  console.log("Test 2: Expected 23 got " + result)
} else {
  console.log("Test 2: success");
}

// Test 3
list = createChain(23, 8778);
result = loopSize(list)
if(result != 8778){
  console.log("Test 3: Expected 8778 got " + result)
} else {
  console.log("Test 3: success");
}

// Test 4
for(i = 0 ; i < 2 ; i ++){
  var a = Math.floor(Math.random()*999) + 9000;
  var b = Math.floor(Math.random()*999) + 9000;
  list = createChain(a, b);
  result = loopSize(list)
  if(result != b){
    console.log("Test 4: Expected " + b + " got " + result)
  } else {
    console.log("Test 4: success");
  }
} 