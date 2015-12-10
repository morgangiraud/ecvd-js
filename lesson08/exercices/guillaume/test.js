function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {

	var koko;

	try {
		koko = primitiveMultiply(a, b);
	} catch(e) {
		koko = reliableMultiply(a, b);
	}

	return koko;
}

console.log(reliableMultiply(8, 8)); // → 64
