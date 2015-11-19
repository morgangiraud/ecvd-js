function closure(){ 
  console.log("Creating a closure");
  var localState = 'pending';

  function makeAction(actionName){
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