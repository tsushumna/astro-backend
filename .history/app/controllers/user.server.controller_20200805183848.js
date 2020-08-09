var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.createUser = function(req, res) {
    var data = req.body;
    User.findOne({ username: req.body }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: 'error while searching for existing user'
            });
        } else if (user) {
            return res.status(400).send({
                message: 'User already exists'
            });
        }
    });
};