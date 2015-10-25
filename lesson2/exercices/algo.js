// Time complexity of code

// Ex 1
// For the sake of this exercice we will say that n is a power of 2
for(var i = n; i>1; i = Math.floor(i/2) ) { // n, n/2, n/4, n/8 ... n / 2^m
  for(var j = 1; j < n; j *= 2 ) { // 1, 2, 4, 8, 16 ... 2^p
    for(var k = 0; k < n; k += 2 ) { // 0, 2, 4, 6, 8 ... n
      ... // constant number of operations
    }
  }
}
/*
Answer: 
1. We can see that all the for-loop are independent from each other
  -> The global complexity will the product of each loop complexity

2. Loop analysis
- The first loop
  - Value taken by i : n, n/2, n/4, n/8 
  - On the last step we have i = 1 and i = n / 2^m (m is the number of iteration)
  - So, we have 2^m = n => m = log(n)
  - Finally we have a complexity of log(n)

- The second loop has the same complexity as the first one: complexity of log(n)

- The third loop will take n/2 steps: complexity of n

3. Total complexity: n * (log(n))^2
*/



// Ex 2
for(var i = 1; i < n; i *= 2 ) {
  for(var j = n; j > 0; j = Math.floor(j/2) { 
    for(var k = j; k < n; k += 2 ) {
      sum += (i + j * k );
    }
  }
}
/*
Answer:
1.  we can see that the first loop is independent from the two other

2. Loop analysis
- The first loop: complexity of n

- The second and third loop are dependent, let's first find a majoration
  - Majoration:
    - On the third loop we have k > j or j > 0 so k > 0
    - If we replace k = j by k = 0 all the loop become again independent
    - The second loop is of complexity log(n)
    - The third loop os of complexity n
    - We have a majoration O(n^2 * log(n))
  - complexity
    - We know that second loop goes round m = log_2(n) times (n = 2^m)
    - for each j  the third loop goes round (n-j)/2 times
    - Globally those two goes round 1 + (n - n/2)/2 + (n - n/4)/2 + (n - n/8)/2 ...
    - 1 + [(n - n/2) + (n - n/4) + ...] / 2
    - 1 + m * n / 2 - (n/2 + n/4 + n/8 + ...) / 2
    - 1 + m * 2^(m-1) - (2^(m-1) + 2^(m-2) + 2^(m-3)) / 2
    - 1 + m * 2^(m-1) − (1 + 2 + ... +2^(m−1)) / 2
    - 1 + m * 2^(m-1) − (2^m - 1) / 2
    - 1.5 + (m - 1) * 2^(m-1)
    - 1.5 + (log(n) - 1) * n / 2
    - Finally the complexity of the two loops is O(n * log(n))

3. Total complexity: n * (log(n))^2
*/


// Ex3
for(var i = n; i > 0; i-- ) { // i = n, n-1, ..., 2, 1
  for(var j = 1; j < n; j *= 2 ) { // j = 1, 2, 4, 8, 16 ... 2^m
    for(var k = 0; k < j; k++ ) { // 
      ... // constant number C of operations
    }
  }
}
/*
Answer:
1.  we can see that the first loop is independent from the two other

2. Loop analysis
- The first loop: complexity of n

- The second and third loop are dependent, let's first find a majoration
  - Majoration:
    - On the third loop we have k < j or j < n so k < n
    - If we replace k < j by K < n all the loop become again independent
    - The second loop is of complexity log(n)
    - The third loop os of complexity n
    - We have a majoration O(n^2 * log(n))
  - complexity
    - We know that second loop goes round m = log_2(n) times
    - for each j  the third loop goes round j times
    - Globally those two goes round 1 + 2 + 4 + 8 + ... + 2^(m-1) = 2^m - 1
    - FInally 2^m - 1 ~ 2^m ~ n

3. Total complexity: n^2
*/