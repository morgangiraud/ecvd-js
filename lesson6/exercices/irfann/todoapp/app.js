document.write("ok");

document.querySelector('.new-todo').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      	console.log(document.getElementsByClassName('new-todo')[0].value);
    }
});