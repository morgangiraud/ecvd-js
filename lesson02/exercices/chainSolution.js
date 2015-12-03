// Morgan's solution - Complexity O((n + m)^2)
function loopSize(node){
  nodes = []; // We need to keep track of nodes we encountered
  while(nodes.indexOf(node) === -1){ // Until we already know the current node, we keep going
   nodes.push(node);
   node = node.next;
  }
  return nodes.length - nodes.indexOf(node); // We remove the tail part in the count
}

// Best solution - Complexity O((n + m))
function loopSize(node){
  var turtle = node;
  var rabbit = node;
  
  // Find a point in the loop.  Any point will do!
  // Since the rabbit moves faster than the turtle
  // and the exercice guarantees a loop, the rabbit will
  // eventually catch up with the turtle.
  do {
    turtle = turtle.getNext();
    rabbit = rabbit.getNext().getNext();
  }
  while (turtle != rabbit && turtle != rabbit.getNext());
  
  // The turtle and rabbit are now on the same node,
  // but we know that node is in a loop.  So now we
  // keep the turtle motionless and move the rabbit
  // until it finds the turtle again, counting the
  // nodes the rabbit visits in the mean time.
  var count = 0;
  do {
    ++count;
    rabbit = rabbit.getNext();
  }
  while (turtle != rabbit);

  // voila
  return count;
}