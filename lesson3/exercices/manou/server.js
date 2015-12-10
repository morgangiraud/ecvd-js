/*
in-class exercice:
Create a very simple webserver, which can distribute any found file and handle the case when no file exists
You can start with the help of the about page of the nodejs website: https://nodejs.org/en/about/
*/

var http = require('http'); // We require the http module, needed to handle http request

// We create the server
http.createServer(function (req, res) { 
   var arrayUrl = req.url.split("?");
   var agmtsString = arrayString[1];
   var agmts = agmtsString.split("&");
   var paramObjet = {};

   for (var i = 0; i < agmts.length; i++) {
    var argument = agmts[i].split("=");
    paramObjet[argument[0]] = argument[1];
  }
  
  console.log(paramObjet);
  if(/favicon/.test(req.url))
  {
    res.writeHead(404);
    res.end();
    return;

  }
  else
    {}
  console.log(req.url);
 
  res.writeHead(200, {'Content-Type': 'text/html'});
    
  res.end(); 
  
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');

