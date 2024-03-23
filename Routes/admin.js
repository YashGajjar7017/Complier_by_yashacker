const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const app = express();

// make array to store icoming request from nodejs
const products = [];

// => Get request
app.get('/add-usr', (req, res, next) => {
    // Simple Express Method
    res.sendFile(path.join(rootDir, 'views', 'index.html'));

    // dynamic page handling
    // res.render('add-product.pug', { pageTitle: 'Add Products', path: '/admin/add-product' })
    console.log('Add a new User');
});
// Post
app.post('/add-usr', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/');
})

app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

// module.exports = Router;
exports.Routes = app;
exports.products = products;