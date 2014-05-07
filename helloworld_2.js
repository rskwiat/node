var http = require('http');
    //normalize url by removing querystring, optional
    //trailing slash, and making it lower case

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?/,'').toLowerCase();
    switch(path){
        case '':
            res.writeHead(200, {'Content Type': 'text/plain'});
            res.end('Home Page');
            break;
        case 'about':
            res.writeHead(200, {'Content Type': 'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(404, {'Content Type': 'text/plain'});
            res.end('Not Found');
            break;
    }
}).listen(8088);

console.log('Server server started on localhost:8088; press Ctrl-C to stop...');
