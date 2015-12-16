var currentId = 0;

function create(text){
  return {
    id: currentId++,
    text: text,
    done: false
  };
}

function getCurrentId(){
  return currentId;
}

function setCurrentId(id){
  currentId = id;
}

module.exports = {
  create: create,
  getCurrentId: getCurrentId,
  setCurrentId: setCurrentId
}