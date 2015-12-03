function arrayToList () {
	var list = [];
	for (var i = 0; i < arguments[0].length; i++) {
		list.push({
			value: arguments[0][i],
            next: null
        });

        if (i > 0) {
            list[i - 1].next = list[i];
        }
	};

	return list[0];
}

function listToArray (list) {
	var tab=[];
	while(list != null){
		tab.push(list.value);
		list = list.next;
	}
	return tab;
}

var a = [1,2,3];

console.log(arrayToList(listToArray(a)));

