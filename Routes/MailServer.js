const express = require('express');
var nodemailer = require('nodemailer');

const app = express();

app.use('/Email', function (req, res, next) {
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yashgujju2004@gmail.com',
                pass: 'password'
            }
        });
    
        var mailOptions = {
            from: 'yashgujju2004@gmail.com',
            to: 'yashgajjar2222@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    
        let url = res.url;
        console.log(url);
    }
    catch (Error){
        console.log(`Your Request Fail : ${Error}`);
    }
})
module.exports = app;