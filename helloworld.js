var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200, {'Content Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8088);

console.log('Server server started on localhost:8088; press Ctrl-C to stop...');
