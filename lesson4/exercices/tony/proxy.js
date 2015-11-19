var http = require('http');



var getPage = function (host, response, url) {



    if (url) {
        //        host = url.replace(/.*?:\/\//g, "").split('?')[0].replace('/', "");
        host = url;
    }



    console.log(host);

    http.request(host, function (res) {


        console.log('host', host);

        var mainData = "";

        console.log('location', res.headers.location);

        res.on('data', function (chunk) {
            mainData += chunk;
        });

        res.on('end', function (chunk) {


            if (res.statusCode == 301 || res.statusCode == 302) {

                console.log("Code ", res.statusCode);

                getPage(host, response, res.headers.location);


            } else {
                response.write(mainData);
                response.end();
            }

        });




    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    }).end();

}


http.createServer(function (request, response) {


    if (/favicon/.test(request.url)) {
        response.writeHead(404);
        response.end();
        return;
    }


    var data = request.url.split("?");
    console.log(data);
    var argsString = data[1];
    if (argsString) {
        var args = argsString.split("&");
        var paramObjet = {};
        for (var i = 0; i < args.length; i++) {
            var argument = args[i].split('=');
            paramObjet[argument[0]] = argument[1];
        }
    }



    var host = paramObjet.website;

    getPage(host, response);



}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');