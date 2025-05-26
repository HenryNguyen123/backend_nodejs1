const express = require('express') //commonjs
const path = require('path');

const configViewEngine = (app) => {
    // config template engine
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    // config static file
    app.use(express.static(path.join(__dirname, '../public')))
}

module.exports = configViewEngine