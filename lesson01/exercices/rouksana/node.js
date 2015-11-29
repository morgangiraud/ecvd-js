var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	var data = req.url.split("?");
	var route = data[0].replace("/", "");
	console.log(data);

	fs.readFile(route, 'utf8' ,function (err, data) {

		if (err){
  			res.writeHeader(404, {'Content-Type': 'text/html'});
  			res.end();
  		}
  		else{
  			res.writeHeader(200, {'Content-Type': 'text/html'});
		    res.write(data);
		    res.end();
  		}
  		
	});

}).listen(1234, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1234/');