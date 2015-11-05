var a = 0;
function asyncIncrement(a, callback){
  setTimeout(function(){
    a++;
    callback(a);
  }, 0);
  // return a;
}
//console.log(asyncIncrement(a));
asyncIncrement(a, console.log);