var http = require('http');

var options = { host: 'google.com'};

var server = http.createServer(function (browser_req, proxy_res) {

	// regex favicon
  	if(/favicon/i.test(browser_req.url)){
  		proxy_res.writeHead(404);
    	proxy_res.end();  
    	return;
	}

	var proxy_req = http.request(options, function(website_res) {
	  website_res.setEncoding('utf8');
	  var data = '';

	  website_res.on('data', function (chunk) {
	    data += chunk;
	  });

	  website_res.on('end', function() {
	    proxy_res.writeHead(website_res.statusCode, website_res.headers);
	    proxy_res.write(data);
	    proxy_res.end();
	  });

	});
	
	proxy_req.end();

	// var arrayUrl = browser_req.url.split("?");
	// var agmtsString = arrayString[1];
	// var agmts = agmtsString.split("&");
	// var paramObjet = {};
	// for(var i = 0; i < agmts.length; i++){
	//   var argument = agmts[i].split("=");
	//   paramObjet[argument[0]] = argument[1];
	// }
	// console.log(paramObjet);

});
 

server.listen(1234, "127.0.0.1");


// Browser -> Proxy = Req 1
// Proxy -> Browser = Res 1
// Proxy -> Website = Req 2
// Website -> Proxy = Res 2





