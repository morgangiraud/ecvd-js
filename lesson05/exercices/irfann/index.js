function closure(){
	var state = "pending";

	function update(s){
		// state = s;
		if (s == "cancel") {
			state = s;
		} else if(s == "validated"){
			state = s;
		}else{
			console.log(state);
		};

		return state;
	}

	return update;
}

var test = closure();

test();
test("validated");
test();
test("cancel");
test();

