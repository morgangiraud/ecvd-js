function range(start, end) {
    var array = [];

    for (var i = start; i <= end; i++) {
        array.push(i);
    }

    return array;
}


function sum(numbersArray) {
    var sum = 0;

    numbersArray.forEach(function (element) {
        sum += element;
    });
    
    return sum;
}

console.log(sum(range(1, 10)));