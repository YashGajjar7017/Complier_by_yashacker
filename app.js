const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // include body-parser

// make an object of express
const app = express();

// import that express routes
const engineExp = require('./Routes/engine.js');
const adminData = require('./Routes/admin.js');
const mailServer = require('./Routes/MailServer.js');
const classroom = require('./Routes/classroom.js');
const shopRoutes = require('./Routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false }));

// register a static folder in which it contains Css/Js files..in which it contains only read exccess from that outer folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/other')));
app.use(express.static(path.join(__dirname, 'Services')));

app.use('/admin', adminData.Routes);
// app.use(shopRoutes);
app.use(engineExp);
app.use(mailServer);
app.use('/classroom', classroom.classroomUrlLoader);

app.use('/update', (req, res, next) => {
    console.log('users Page');
    res.send('<body style="background:black;"><center><h2 style="color:red;"><p style="color:yellow;">Warning!</p> If you manually update complier then it would be crash.. so be aware from this <br> Type :<br> /UpdateComplier --debug</h2></center></body>');
});

// 404 error : putting at last after all the request are check
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
console.log("Your express server is running on : http://localhost:3000");