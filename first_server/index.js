const http = require('http');
// import http from 'http'

const hostName = 'localhost';
const port = 3000;

const server = http.createServer((request,response)=>{
    const { url } = request;

    if( url === '/translations' ){
        const translations = { 1:"one",2:"two",3:"three"};
        response.setHeader('Content-Type','application/json');
        response.write( JSON.stringify( translations ) );
        response.end();
    }
    response.end("Welcome to Node.js");
})

server.listen(port,hostName,()=>{
    console.log(`this server is hosted on domain ${hostName}:${port}`);
})