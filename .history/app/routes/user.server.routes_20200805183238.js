'use strict';
var users = require('../controllers/user.server.controller');
var todo = require('../controllers/todo.server.controller');
module.exports = function(app) {
    app.route('/getAllPlanetPositions')
        .post(planets.getAllPlanetPositions);
}