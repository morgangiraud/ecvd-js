var a = [{index:1}, {index:2}, {index:3}];
(function(){
  // We use an IIFE to avoid polluting the globals
  // Vars i and element won't be visible/accessible outside of this scope
  for(var i = 0; i < a.length; i++){
    var element = a[i];

    element.log = function(){
      console.log(i);
    }
  }
})()

console.log("Without closure:");
// Display 3, 3, 3
for(var i = 0; i < a.length; i++){
  a[i].log();
}


// Closure to the rescue
a = [{index:1}, {index:2}, {index:3}];
(function(){
  for(var i = 0; i < a.length; i++){
    var element = a[i];
    
    element.log = (function(i){ // With an IIFE closure
      // a local var i is declared inside the closure
      return function (){
        console.log(i);
      }
    })(i);
  }
})()

console.log("With closure:");
// Display 1,2,3
for(var i = 0; i < a.length; i++){
  a[i].log();
}