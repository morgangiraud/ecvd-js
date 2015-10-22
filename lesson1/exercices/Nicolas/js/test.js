var http = require('http');
var fs = require("fs");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var data = req.url.split('/').pop();
  console.log(data);

  fs.readFile(data,'utf-8',function (err, data){
  	if (err) {
  		res.writeHead('404');
  	} else{
  		console.log(data);
  		res.end(data);
  	}
  });

}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');