var list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
};

function arrayToList(array) {
    var list = {};

    list.value = array.shift();
    list.next = {};

    var currentIndex = list.next;

    array.forEach(function (element) {
        currentIndex.value = element;
        currentIndex.next = {};
        currentIndex = currentIndex.next;
    });

    return list;
}

//console.log(arrayToList([1, 2, 3]));

function listToArray(list) {
    var array = [],
        currentIndex = list;

    while (true) {
        if (currentIndex.value != undefined) {
            array.push(currentIndex.value);
        }

        if (currentIndex.next) {
            currentIndex = currentIndex.next;
        } else {
            return array;
        }
    }

}

//console.log(listToArray(list));

var data = [2, "test", false, {
    "ref": 3
}];

console.log(data);
console.log(listToArray(arrayToList(data)));