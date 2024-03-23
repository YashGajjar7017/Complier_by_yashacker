const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const FileReader = require('filereader');
const sessionStorage = require('node-sessionstorage');

const app = express();

// main page
app.use('/', function (req, res, next) {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

// login page
app.post('/login', (req, res, next) => {
    try {
        // res.sendFile(rootDir, '/');
        let nameData = sessionStorage.getItem('nameToken');
        console.log(nameData);
        res.redirect(`/`);
        console.log("login success");
    }
    catch (e) {
        console.log(`sorry ! login can't fetch ${e}`);
        res.sendFile(rootDir, '/404');
    }

    // res.setHeader('Content-Type', 'text/html');
    res.status = 301;
    res.setHeader('Location','/usr=yashacker');
    res.end();
});

// Features
app.use('/features', (req, res, next) => {
    res.send("<html><body> <center><h2>Features are loading! but you can't wait for that </h2></center> </body></html>")
    console.log('features Data loading');
});

// Fetching Userdata from files:
app.use('/usr=', function UserData(req, res, next) {
    // location.href(`https://localhost:3000/usr=${tempname}`)
    // sessionStorage.getItem('nameToken');

    let reqUrl = req.url();
    console.log(reqUrl);
});

// Forgot password
app.use('/forgotPassword', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'Services', 'forgotPassword.html'));
    setTimeout(()=>{
        res.redirect(`/otp`);
    },10000)
});

//join 
app.use('/join', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'forgotPassword.html'));
    const joiner = req.url(fetch);
    console.log(joiner);
});

//share 
app.use('/share', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'forgotPassword.html'));
});

// upload 
app.post('/upload', (req, res, next) => {
    if (req.url == '/upload') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="/upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath;
            var newpath = 'A:/temp' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
            });
            return res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<form action="/upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
});

// -------------OTP-------------
app.use('/otp', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'other', 'otp.html'));
});

// |++++++++++++++++++++++++ Function ARE WRITTEN ++++++++++++++++++++++++++++++|

// Login Export
module.exports = function UserRedirect() {
    if (!sessionStorage.getItem('username')) {
        sessionStorage.setItem('login', 1)
    }
    else {
        sessionStorage.setItem('login', 0)
    }
}

// URL Fetcher
function UrlFetcher(req, res) {
    const UrlData = new URL();
    fetch('/')
        .then(res => res.json())
        .then(data => console.log("Response Back"))
        .catch(error => console.log("Oh! Something went wrong"));
    console.log(this.error);
}

// Maker a Timer(25s)
function resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function f1() {
    const x = await resolveAfter2Seconds(10);
    console.log(x); // 10
}

// f1();

// app.set("/users/login", path.join(rootDir, "../views/login"));
module.exports = app;