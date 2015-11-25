/*
in-class exercice:
Create a very simple webserver, which can distribute any found file and handle the case when no file exists
You can start with the help of the about page of the nodejs website: https://nodejs.org/en/about/
*/

var http = require('http'); // We require the http module, needed to handle http request
var fs = require('fs'); // We require the file system to access files

// We create the server
http.createServer(function (req, res) { // This callback is called every time a request come to the webserver
  // console.log(req, req.url) 
  // Let's see what is inside the request, focus on the url
  // We can see that chrome keeps asking for the favicon.ico url on its own or we don't have any favicon
  /*
  Examples for req.url
  /
  /favicon.ico
  /favicon.ico

  /?test=hello
  /favicon.ico
  /favicon.ico

  /index.html
  /favicon.ico
  /favicon.ico
  
  /alert.js
  */

  var filename = req.url.split("?").shift().substr(1);
 
  // fs.readFile(filename function(err, data){ // First we see that we see that data is a buffer when we log it
  fs.readFile(filename, 'utf-8', function(err, data){ // Now we can see our html file
    // console.log(data);
    // if err throw err // Since we don't want our program to crash when na error happened, we remove this statement
    if(err){
      res.writeHead(404);
      res.end();
    } else {
      // res.writeHead(200, {'Content-Type': 'text/plain'}); // We have to remove this header if we want the browser to interpret our html file
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);  
    }
  });
  
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');

