// const http = require('http');
// const fs = require('fs');
// const PORT = process.env.PORT;

// const server = http.createServer((req,res)=>{
//     const handleReadFile = (fileName,statusCode,req,res)=>{
//         fs.readFile(fileName, "utf-8",(err,data)=>{
//             if(err){
//                 console.log(err);
//             }else{
//                 res.writeHead(statusCode,{"Content-Type" : "text/html"});
//                 res.write(data);
//                 res.end();
//             }
//         });
//     }
//    if(req.url === '/'){
//     handleReadFile('index.html',200,req,res)
//    }else if(req.url === '/about'){
//     handleReadFile('about.html',200,req,res)
//    }else if(req.url === '/contact'){
//     handleReadFile('contact.html',200,req,res)
//    }else{
//     handleReadFile('404.html', 404,req,res)
//    }
// });

// server.listen(PORT,()=>{
//     console.log(`server is running ${PORT}`)
// });
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000; // Default port 3000 if PORT environment variable is not set

const server = http.createServer((req, res) => {
    const handleReadFile = (fileName, statusCode, req, res) => {
        const filePath = path.join(__dirname, fileName); // Constructing file path
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File not found error
                    handleReadFile('404.html', 404, req, res);
                } else {
                    // Other error
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
            } else {
                res.writeHead(statusCode, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    };

    // Using url.parse(req.url).pathname to extract path without query parameters
    const urlPath = require('url').parse(req.url).pathname;
    if (urlPath === '/') {
        handleReadFile('index.html', 200, req, res);
    } else if (urlPath === '/about') {
        handleReadFile('about.html', 200, req, res);
    } else if (urlPath === '/contact') {
        handleReadFile('contact.html', 200, req, res);
    } else {
        handleReadFile('404.html', 404, req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
