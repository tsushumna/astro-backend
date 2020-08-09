var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.createUser = function(req, res) {
    var data = req.body;
    User.findOne({ username: req.body }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
    });
};