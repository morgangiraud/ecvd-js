// Time complexity of code

// Ex 1
for( var i = n; i > 0; i /= 2 ) { // log(n)
  for( var j = 1; j < n; j *= 2 ) { // log(n)
    for( var k = 0; k < n; k += 2 ) { // n/2
      ... // constant number of operations
    }
  }
}
/*
Answer: log(n)² * n/2 
*/


// Ex 2
for(var i = 1; i < n; i *= 2 ) { // log(n)
  for(var j = n; j > 0; j /= 2 ) { // log(n)
    for(var k = j; k < n; k += 2 ) { // n/2
      sum += (i + j * k );
    }
  }
}
/*
Answer: log(n)² * n/2 
*/


// Ex3
for(var i = n; i > 0; i-- ) { // n
  for(var j = 1; j < n; j *= 2 ) { // log(n)
    for(var k = 0; k < j; k++ ) { // j
      ... // constant number C of operations
    }
  }
}
/*
Answer: 
n * (log(n) * j) 
= n * n * log(n) 
      n * log(n) < O(n) < n² * log(n)


      O(n) = n* 2*log(n)
*/
