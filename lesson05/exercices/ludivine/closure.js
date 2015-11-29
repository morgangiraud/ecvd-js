function closure () {

	var state = "pending";
	function update(state) {

		console.log(state);
	}
	return update;
}

var toto = closure();
toto('lulu');