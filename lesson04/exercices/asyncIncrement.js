var a = 0;
function asyncIncrement(a){
  setTimeout(function(){
    a++;
  }, 0);
  return a;
}
console.log(asyncIncrement(a));