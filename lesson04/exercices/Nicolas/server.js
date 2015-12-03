var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (browserRequest,proxyResponse){
  var regex = /favicon/;

  if(regex.test(browserRequest.url)){
    proxyResponse.writeHead(404);
    proxyResponse.end();
    return;
  }

  var page = url.parse(browserRequest.url).pathname;
  console.log(page);

  var params = url.parse(browserRequest.url).query;
  console.log(params);

  var arrayParams = querystring.parse(params);
  console.log(arrayParams);

  var option = {host: arrayParams.website};
  console.log(option);

  var proxyRequest = http.request(option,function (websiteResponse){
    var data = '';
    
    websiteResponse.on('data',function (chunk){
      data += chunk;
    });
    websiteResponse.on('end',function (){
      proxyResponse.writeHead(websiteResponse.statusCode,websiteResponse.headers);
      proxyResponse.write(data);
      proxyResponse.end();
    });
  });

  proxyRequest.end();


  //res.writeHead(200,{'Content-Type': 'text/html'});
  // if(page == '/test' && 'nom' in arrayParams && 'prenom' in arrayParams){
  //   res.write('<p>Je suis sur la page <strong>test</strong></p><p>Tu es ' + arrayParams['prenom'] + ' ' + arrayParams['nom'] +'</p>');
  // } else {
  //   res.write('<p>Je suis sur la page <strong>d\'accueil</strong></p>');
  // }
  //res.end();
});

server.listen(1337, '127.0.0.1');