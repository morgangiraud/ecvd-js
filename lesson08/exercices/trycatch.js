function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  var counter = 0;
  var ok = false, val;
  while(!ok){
    try {
      counter++;
      val = primitiveMultiply(a, b);
      ok = true;
    } catch (e){ } // We don't do anything
  }
  console.log("Tried " + counter + " times");
  return val;
}

console.log(reliableMultiply(8, 8)); // → 64