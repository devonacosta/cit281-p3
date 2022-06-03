//return contents of file from week 4 lecture
//readFile()

//Fastify framework
const fastify = require("fastify")();
const fs = require("fs");
const {coinCount} = require("./p3-module.js");

/*
//exporting coinCount
module.exports = {
    coinCount
};
*/

/*
//read file example from week 4 lecture PHIL 
const http = require('http');
//const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
fs.readFile(`${__dirname}/index.html`, (err, data) => {
if (err) {
console.log(err);
res.statusCode = 500;
res.setHeader('Content-Type', 'text/html');
res.end("Error processing request");
} else {
res.statusCode = 200;
console.log("URL: ", req.url);
res.setHeader('Content-Type', 'text/html');
res.write(data);
res.end();
}
});
});
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});
*/


 fastify.get("/", (request, reply) => {
     fs.readFile(`${__dirname}/index.html`, (err, data) => {
         if (err) {
        reply 
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("<h1></h1>");
         } else {
        reply
             .code(200)
             .header("Content-Type", "text/html; charset=utf-8")
             .send(data);
         }
     });
 });
 
//FIRST GET ROUTE
//part 9
fastify.get("/coin", (request, reply) => {
    //extracted from request.query using object deconstruction
    let { denom = 0, count = 0 } = request.query; 
     denom = parseInt(denom);
     count = parseInt(count); 
     const coinValue = coinCount({ denom, count }); 
  
    reply
    //Return a status code of 200, and an appropriate Content-Type MIME header
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    //Return the actual result using the following template string literal
    .send(
        `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
        );
  });

  //part 10
//SECOND GET ROUTE
  fastify.get("/coins", (req, res) => {
    let { option } = req.query; 
     option = parseInt(option);
     let coinValue = []; 
     const coins = [
         { denom: 25, count: 2},
         { denom: 1, count: 7},
     ];
     switch (option) {
         case 1:
             coinValue = coinCount({ denom: 5, count: 3}, { denom: 10, count: 2});
             break;
        case 2:
            coinValue = coinCount(...coins);
            break;
        default:
            coinValue = 0;
            break;
     }
  
    res
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    //Return the actual result using the following template string literal
    .send(
        `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
        );
  });

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
