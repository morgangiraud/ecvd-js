/*
in-class exercice:
Create a very simple proxy server
*/

// ------------ Global scope declaration --------------
// Native modules
var http = require('http'); 
var fs = require('fs');

//We keep track of the current request number to ease reading logs
var requestNumber = 0; 

// Helper to parse url data
function parseUrl(url){
  var urlData = {
    url: url,
    params: {}
  };

  var splittedUrl = url.split("?")
  urlData.route = splittedUrl[0];
  if(splittedUrl.length === 2){
    var params = splittedUrl[1].split("&");
    for(var i=0; i < params.length; i++){
      var subParams = params[i].split("=");
      if(subParams.length === 2){
        urlData.params[subParams[0]] = subParams[1];
      }
    }
  }
  return urlData;
}
// ---------- End Global scope declaration ------------

http.createServer(function (req, res) {
  // Local anonymous callback scope

  requestNumber++; // We increment the global var requestNumber

  // The current anonymous function will be call for each request coming to the server
  // Multiple call can be made simulteanously and each call will increment the global variable requestNumber
  // To log efficiently, we need to keep track of the current requestNumber
  // --> We copy it in the current local scope
  var currentRequestNumber = requestNumber; 
  console.log("Request " + currentRequestNumber + ": from " + req.headers.host + " for " + req.url);

  if(/favicon/i.test(req.url)){ // We use a regexp to handle the favicon case
    console.log("Request " + currentRequestNumber + ": returns 404");

    res.writeHead(404);
    res.end();  
    return;
  }

  var data = parseUrl(req.url);
  if(data.params.website != undefined){
    var options = {
      host: data.params.website,
      method: req.method,
    };
    // We prepare the proxy request
    var proxyRequest = http.request(options, handleProxyResponse); // handleProxyResponse is accessible
    // We make the http request call
    proxyRequest.end(); 

    // Remember: function declaration are hoisted!
    // This mean we could have declared this function at the top of this scope
    function handleProxyResponse(proxyResponse) { 
      console.log("Request " + currentRequestNumber + ": handling Response");

      var buffer = ''
      proxyResponse.on('data', function (chunk) {
        buffer += chunk;
      });

      proxyResponse.on('end', function () {
        // We handle the rediret case manually
        if(proxyResponse.statusCode === 302 || proxyResponse.statusCode === 301){
          console.log("Request " + currentRequestNumber + ": Following a redirect to " + proxyResponse.headers.location);
          
          http.request(proxyResponse.headers.location, handleProxyResponse).end(); 
        } else {
          // We proxy all the response headers
          res.writeHead(proxyResponse.statusCode, proxyResponse.headers); //We pass along all the proxy response headers
          // We proxy all the response data
          console.log(buffer);
          res.write(buffer);
          // We finally send back the response to the browser
          res.end();
        }
      });
    }
  } else {
    console.log("Request " + currentRequestNumber + ": no website param found");

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();  
  }  
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');