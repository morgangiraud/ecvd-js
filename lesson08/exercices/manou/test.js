
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  var x = toto;
  toto = newtoto

  try {
  	return a * b;
  }catch
 	console.log(newtoto);
 }

console.log(reliableMultiply(8, 8)); // → 64

