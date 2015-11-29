
var http = require('http');
var net = require('net');
var url = require('url');


var getAll = function (location, res){
  var options = {
      host: location
    };

  http.request(options, function(resp) {
      var data ='';
      resp.on('data', function(chunk){
          data += chunk;
      });
      resp.on('end', function() {
        if (resp.statusCode === 302 || resp.statusCode === 301 && resp.headers.location) {
          var url = resp.headers.location;
          var protomatch = /.*?:\/\/www./g;
          var b = url.replace(protomatch, '');
          console.log(b);
          getAll(url, res);
        }else{
          res.writeHead(resp.statusCode, resp.headers);
          res.write(data);
          res.end();
        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);

    }).end();
}

// We create the server
http.createServer(function (req, res) { // This callback is called every time a request come to the webserver
    if(/favicon/i.test(req.url)){
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end();
      return;
    }
    var url = req.url.split('?');
    var args = url[1];
    var ar = args.split("&");
    var paramObjet = {};
    console.log(args);


    for(var i = 0; i < ar.length; i++){
      var argument = ar[i].split('=');
      paramObjet[argument[0]] = argument[1];
    }
    
    getAll(paramObjet.site, res);


}).listen(1337, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1337/');

