var http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8000;


var server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    if (req.url == '/') { //check the URL of the current request

        res.writeHead(200, { 'Content-Type': 'text/html' });
        const data = fs.readFileSync('login/Sign_Up.html');
        res.end(data.toString());

    }
    else if (req.url == "/login") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        const data = fs.readFileSync('login/Sign_In.html');
        res.end(data.toString());

    }
    else if (req.url == "/admin") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();

    }
    else
        res.end('Invalid Request!');

});

// const server = http.createServer((request, response) => {
    
//     console.log(request); //when you hit the server, it will note all responses 
//     // console.log(request.url) //This will return your link with you inputData

//     if (request.url == '/') {
        
//     } else if (request.url == '/aboutDocs') {
//         response.statusCode = 200;
//         response.end('<center><h2>updated new aboutDocs of node.js tuturial</h2></center>');
//     } else if (request.url == '/updatedPage') {
//         response.statusCode = 200;
//         response.end('<center><h2>Welcome to node.js tuturial</h2></center>');
//     } else {
//         response.statusCode = 404;
//         response.end('<center><h2 style:"height:50%;">Cool! This is perfect time to start maintance</h2></center>');
//     }

// }); //This one is inBuilt method 'createServer'


// server is listenning below syntax :
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
