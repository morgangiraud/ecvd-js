// NFE:
function logMyName(){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  console.log("My name is " + name);
}
logMyName();

// Anonymous
var logMyName2 = function (){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  console.log("My name is " + name);
}
logMyName2();


// IIFE
(function (){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  console.log("My name is " + name);
})()

// IIFE - async
var outsideName = (function (){
  var name = arguments.callee.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  setTimeout(function(){
    name = "fakeName";
    console.log("My name is " + name);
  }, 0);
  return name;
})()
console.log("outsideName is " + outsideName);