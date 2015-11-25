function createClosure(){ 
  console.log("Creating a closure");
  var localState = 'pending';

  function closure(actionName){
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