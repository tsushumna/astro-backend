const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
var methodOverride = require('method-override');
const path = require('path');
var compress = require('compression');
app.listen(3000);
var exports = module.exports = app;
var config = require('./config');

const client = require('twilio')('AC3b60dcd12bfc2ed4673dfd999da41de2', 'c920b10af797a328c4dea7fb97334d20');

client.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'Hey ,I am SUSHUMNA.I am sending this message from node',
    to: 'whatsapp:+919866027885'
}).then(message => console.log(message.status));


app.use(function(req, res, next) {
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

app.use(function(err, req, res, next) {
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
// app.use(function (req, res) {
//     res.status(404).render('404', {
//         url: req.originalUrl,
//         error: 'Not Found'
//     });
// });

app.use(bodyParser.urlencoded({
    limit: 10,
    extended: true
}));

app.use(bodyParser.json({ limit: 10 }));
app.use(methodOverride());

app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// Showing stack errors
app.set('showStackError', true);

app.get('/check', function(req, res) {
    res.send('cfvgbhnj');
});
config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
});
// Set swig as the template engin
console.log('nVipani application started on port ' + 3000);