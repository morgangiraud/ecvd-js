function closure(){ 
  var localState = 'pending';

  function updateState(data){
    if (data == 'valid'){
      localState = 'validated';
    }
    else if(data == 'cancel'){
      localState = 'canceled';
    }
    else{
      console.log(localState);
    }
  }
  return updateState;
}

var test = closure();
test(); // pendding
test('valid'); 
test(); // validated
test('cancel'); 
test(); // canceled