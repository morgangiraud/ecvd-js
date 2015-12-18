/*
in-class exercice:
Create a very simple webserver, which can distribute any found file and handle the case when no file exists
You can start with the help of the about page of the nodejs website: https://nodejs.org/en/about/
*/

var http = require('http'); // We require the http module, needed to handle http request
var fs = require('fs'); // We require the file system to access files

// We create the server
var proxy = http.createServer(function (browserRequest, proxyResponse) {

  if (/favicon.ico/i.test(browserRequest.url)) {
    proxyResponse.writeHead(404, {'Content-Type': 'text/html'});
    proxyResponse.end();
    return;
  }

  var arrayString = browserRequest.url.split("?");
  var argString = arrayString[1];
  var agmts = argString.split("&");
  var paramObjet = {};

  for (var i=0; i< agmts.length; i++) {
    var argument = agmts[i].split ("=");
    paramObjet [argument[0]] = argument [1];
  }

  console.log(paramObjet.website);



  var options = {

  		hostname: paramObjet.website

  };

  	http.get(options, function(websiteResponse) {
  		//init dataAll
      var dataAll = '';
      websiteResponse.on('data', function(data) {
        dataAll += data;
    		
  		});
 
      websiteResponse.on('end', function() {
    		proxyResponse.end(dataAll);
        //websiteResponse.header 
    	});

    });
      console.log(browserRequest.url);

  });


proxy.listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');


