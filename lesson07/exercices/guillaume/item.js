function itemFactory(){

  var currentId = 0;

  function create(text){
    return {
      id: currentId++,
      text: text
    };
  }

  function getCurrentId(){
    return currentId;
  }

  function setCurrentId(id){
    currentId = id;
  }

  return {
    create: create,
    getCurrentId: getCurrentId,
    setCurrentId: setCurrentId
  }
}

module.exports = itemFactory();