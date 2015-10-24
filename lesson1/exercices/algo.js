// Time complexity of code

// Ex 1
// For the sake of this exercice we will say that n is a power of 2
for(var i = n; i>1; i = Math.floor(i/2) ) { // n, n/2, n/4, n/8 ... log(n)
  for(var j = 1; j < n; j *= 2 ) { // 1, 2, 4, 8, 16 ... log(n)
    for(var k = 0; k < n; k += 2 ) { // 0, 2, 4, 6, 8 ... n
      ... // constant number of operations
    }
  }
}
/*
Answer: 
1.  we can see that all the for-loop are independent from each other
  -> The global complexity will the product of each loop complexity
- The first loop
  - Value taken by i : n, n/2, n/4, n/8 ... n/2^(m-1), n/2^m < 1. m is the number 
of iteration needed to end this loop. we have a complexity of m
  - we know that we need m step to end this for-loop with an input of size n
  - So, in term of complexity we have 2^m = n 
  - 2^m = n => m * log(2) = log(n) => m = log(n)
  - Finally we have a complexity of log(n)

2. The second
all functions are indepedent so: n log^2(n)
*/


// Ex 2
for(var i = 1; i < n; i *= 2 ) { // i = 1, 2, 4, 8, 16 ... log(n)
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
  for(var j = 1; j < n; j *= 2 ) { // log(f(n)) = log(e^n) = n
    for(var k = 0; k < j; k++ ) { // e^n
      ... // constant number C of operations
    }
  }
}
/*
Answer:
*/