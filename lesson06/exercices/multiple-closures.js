function outerFunction(){ 
  var local = "i am local";
  function innerFunction(){ // We create a first inner function
    console.log(local);
  } 
  function innerFunction2(){ // We create a second inner function
    console.log(local);
  } 

  var holdingClosures = {
    firstClosure: innerFunction,
    secondClosure: innerFunction2
  }

  return holdingClosures;
}
var object1 = outerFunction(); 
object1.firstClosure();
object1.secondClosure();