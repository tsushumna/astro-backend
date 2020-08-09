'use strict';
var planets = require('../controllers/planetposition.server.controller');
module.exports = function (app) {
    app.route('getAllPlanetPositions')
        .post(planets.getAllPlanetPositions);
}