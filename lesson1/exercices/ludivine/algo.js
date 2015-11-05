// Time complexity of code

// Ex 1
for( var i = n; i > 0; i /= 2 ) { // n, n/2, n/4, n/8, ... log(n)
  for( var j = 1; j < n; j *= 2 ) { // 1, 2, 4, 8, 16, 32 log(n)
    for( var k = 0; k < n; k += 2 ) { // 0, 2, 4, 6, 8 n
      ... // constant number of operations
    }
  }
}
/*
Answer: all function are not independent so : n log^2(n)
*/


// Ex 2
for(var i = 1; i < n; i *= 2 ) {
  for(var j = n; j > 0; j /= 2 ) {
    for(var k = j; k < n; k += 2 ) {
      sum += (i + j * k );
    }
  }
}
/*
Answer: Same as first one 
*/


// Ex3
for(var i = n; i > 0; i-- ) { // n 
  for(var j = 1; j < n; j *= 2 ) { // log(n)
    for(var k = 0; k < j; k++ ) { // j = 1, 2, 4, 8... 
      ... // constant number C of operations
    }
  }
}
/*
Answer:
*/