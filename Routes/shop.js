const express = require('express');
const path = require('path');
const adminData = require('./admin.js');

const app = express();

app.get('/premium', (req, res, next) => {
    // This is HTML method for render to express
    // console.log('shop.js',adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    // This is new for PUG to render
    const products = adminData.products; //render dynamic content
    res.render(
        'shop.html',
        {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0, // this check because .hbs file can't run js code 
            activeShop: true,
            productCSS: true
        } /*here this is sending data to other Files/Templete*/
    );
})

module.exports = app;