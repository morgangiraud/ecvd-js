function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

var location = header.location.split("?");

      //console.log('location', location);

      // var the_url = extractDomain('http://'+location);
      // console.log('the_url', the_url);

      // var the_path;

      // if(typeof location.split('/')[3] !== 'undefined') {
      //   the_path = location;
      // }