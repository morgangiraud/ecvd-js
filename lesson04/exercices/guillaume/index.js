var http = require('http'); // We require the http module, needed to handle http request


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

function request(url, path, callback) {
    // console.log('url : '+ url);
    // console.log('path : '+path);

    var options = {
        host: url,
        path: path,
        method: 'POST'
    };

    http.request(options, function(responseQuery) {

        //console.log('STATUS: ' + responseQuery.statusCode);
        var header = responseQuery.headers;
        //console.log('HEADER: ', header);

        if(responseQuery.statusCode === 200) {

            responseQuery.setEncoding('utf8');

            var the_body = '';

            responseQuery.on('data', function (chunk) {
                the_body += chunk;
            });

            responseQuery.on('end', function() {

                //console.log('responseQueryPONSE SENT MADAFUCKA');

                var response = {
                    body:the_body,
                    code: responseQuery.statusCode,
                    headers: header
                };

                callback(null, response);
            });

        } else if(responseQuery.statusCode === 301 || responseQuery.statusCode === 302) {
            console.log('location : '+header.location);

            var location = header.location.split("?");

            if(location[0].substr(0, 4) === 'http') {
                if(location[0].substr(0, 7) === 'http://') {
                    the_url = location[0].substr(7);
                } else if(location[0].substr(0, 7) === 'https:/') {
                    the_url = location[0].substr(8);
                }

                the_url = the_url.slice(0, -1);

                var the_path = (typeof location[1] === 'undefined') ? the_path = '' : '/?'+location[1];

                request(the_url, the_path, callback);
            } else {
                console.log('ERROR', location);
            }
        }

    }).end();
}

http.createServer(function (req, res) {

    if(/favicon/i.test(req.url)){ res.writeHead(404); res.end(); return; }
    var data = req.url.split("?");

    if(typeof data[1] !== 'undefined') {

        var target_url = data[1].split('=')[1];

        request(target_url, '', function(error, response) {

            //console.log(response.headers);
            // for(var header in response.headers) res.setHeader(header, response.headers[header]);

            res.writeHead(response.code, response.headers);

            console.log(response.body);

            res.write(JSON.stringify(response.body));
            res.end();

            return;
        });
    }

}).listen(1337);

console.log('Server running at http://localhost:1337/');
