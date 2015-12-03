<<<<<<< HEAD
function closure(){ 
  console.log("Creating a closure");
  var localState = 'pending';

  function makeAction(actionName){
=======
function createClosure(){ 
  console.log("Creating a closure");
  var localState = 'pending';

  function closure(actionName){
>>>>>>> a892f00e9fbcc6ceec94cf8b188d9e26bb7bc1ef
    switch(actionName){
      case 'validate':
        localState = 'validated';
        break
      case 'cancel':
        if(localState != 'validated'){
          localState = 'canceled';
        }
        break
      default:
        console.log(localState);
    }
  }

<<<<<<< HEAD
  return makeAction;
}
var makeAction = closure();
makeAction();
makeAction('validate');
makeAction();
makeAction('cancel');
makeAction();

var makeAction2 = closure();
makeAction2();
makeAction2('cancel');
makeAction2();
=======
  return closure;
}
var closure = createClosure();
closure();
closure('validate');
closure();
closure('cancel');
closure();

var closure2 = createClosure();
closure2();
closure2('cancel');
closure2();
>>>>>>> a892f00e9fbcc6ceec94cf8b188d9e26bb7bc1ef

// We could rename all those elements to get:
function createOrder(){ 
  console.log("Creating an order");
  var localState = 'pending';

  function order(actionName){
    switch(actionName){
      case 'validate':
        localState = 'validated';
        break
      case 'cancel':
        if(localState != 'validated'){
          localState = 'canceled';
        }
        break
      default:
        console.log(localState);
    }
  }

  return order;
}
var order = createOrder();
order();
order('validate');
order();
order('cancel');
order();

var order2 = createOrder();
order2();
order2('cancel');
order2();