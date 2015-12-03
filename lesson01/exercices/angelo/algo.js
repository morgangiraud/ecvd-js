// Time complexity of code

// Ex 1
for( var i = n; i > 0; i /= 2 ) {
  for( var j = 1; j < n; j *= 2 ) {
    for( var k = 0; k < n; k += 2 ) {
      ... // constant number of operations
    }
  }
}
/*
Answer:
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
Answer:
*/


// Ex3
for(var i = n; i > 0; i-- ) {
  for(var j = 1; j < n; j *= 2 ) {
    for(var k = 0; k < j; k++ ) {
      ... // constant number C of operations
    }
  }
}
/*
Answer:
*/