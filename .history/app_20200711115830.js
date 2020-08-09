const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
var swisseph = require('swisseph');
app.listen(3000);
var exports = module.exports = app;
console.log('nVipani application started on port ' + 3000);
app.post('/getAllPlanetPositions', () => {
    
});