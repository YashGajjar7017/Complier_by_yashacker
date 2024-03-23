const express = require('express');
const path = require('path');

const app = express();

// classLoader
app.use('/classloader', function (req, res, next) {
    res.send('<h1>Your class is loading</h1>');
    next();
});

// classroom ID
app.use('/classID', function (req, res, next) {
    res.send('<h1>Getting class ID</h1>')
});

module.exports.classroomUrlLoader = app;