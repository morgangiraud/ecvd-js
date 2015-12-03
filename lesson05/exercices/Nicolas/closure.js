function closure(){
	var state = 'test';

	function innerFunction(state){
		console.log(state);
	}

	return innerFunction;
}

var f = closure();
f('lolo');