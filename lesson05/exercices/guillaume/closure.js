function Inception() {

	var state = 'pending';

	function Funception(OhYeah) {

		if(OhYeah === 'validate_me_please') {
			state = 'validated';
		} else {
			state = 'cancel';

			function OhDamnANewFunction() {
				state = 'yeah';
				return state;
			}

			return OhDamnANewFunction();
		}

		return state;
	}

	return Funception;
}() => {
	console.log('ok');
};

var closure = Inception();
console.log(closure());
console.log(closure('validate_me_please'));

var koko = new Array();
var monkoko = new Array(10);
