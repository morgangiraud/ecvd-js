function outside(){
	var state = 'test';

	function inner(state){
		console.log(state);
	}

	return inner;
}

var closure = outside();
closure('test2');