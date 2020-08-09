'use strict';
var users = require('../controllers/user.server.controller');
var todo = require('../controllers/todo.server.controller');
module.exports = function(app) {
    app.route('/user')
        .post(users.createUser);
    app.route('/signin')
        .post(users.sigin);
    app.route('/list')
        .get(users.list);

    app.route('/createList')
        .post(users.createList);
}