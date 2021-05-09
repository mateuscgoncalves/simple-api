require('./database');
const http = require('http');
const { parse } = require('url');
const routes = require('./routes/');



const server = http.createServer(async (req, res) => {

    const url = parse(req.url);
    const method = req.method.toLowerCase();

    if(routes[url.pathname] && routes[url.pathname][method]){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        routes[url.pathname][method](req, res);
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("Not Found")
    }
});

server.listen(8080);