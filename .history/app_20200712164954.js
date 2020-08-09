const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
app.listen(3000);
var exports = module.exports = app;
var config = require('./config');
config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
    require(path.resolve(routePath))(app);
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'If-None-Match, Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Max-Age', '86400');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        req.setTimeout(0);
        next();
    }
});

app.use(function (err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
        error: err.stack
    });
});

// Assume 404 since no middleware responded
app.use(function (req, res) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not Found'
    });
});

app.use(bodyParser.urlencoded({
    limit: 10
    extended: true
}));
app.use(bodyParser.json({ limit: 10 }));
app.use(methodOverride());

console.log('nVipani application started on port ' + 3000);
