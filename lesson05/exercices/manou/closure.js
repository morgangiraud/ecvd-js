function closure () {

	var state = "pending";
	function update(lome) {

		console.log(lome);
	}
	return update;
}

var toto = closure();
toto('manou');