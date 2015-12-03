function closure() {
    
    var localState = 'pending';
    
    function updateState(state) {
        if (state == "validated" || state == "cancel") {
            localState = state;
        } else {
            console.log(localState);    
        }
    }

    return updateState;
}

var test = closure();

test();
test('validated');
test();
test('cancel');
test();