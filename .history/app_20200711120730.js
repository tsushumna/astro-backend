const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
const routes = require('./routes/planetposition.server.routes');
app.listen(3000);
var exports = module.exports = app;
console.log('nVipani application started on port ' + 3000);
