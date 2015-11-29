//*************************Fonction Range***************************//

function range (start, end) {

var arr = [];

for (i= start; i<= end; i++) {

	arr.push(i);
	}

	return arr;
}

function sum (arr){

	 i=0;
	 somme=0;

    for (i=0 ; i<arr.length; i++) {
     somme=somme+arr[i];
    }
    return somme;
 
}

console.log(sum(range(1, 10)));