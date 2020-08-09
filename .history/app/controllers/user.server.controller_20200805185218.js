var mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    User = mongoose.model('User');

function genToken(username, id) {
    var d = new Date();
    var daysToExpiry = 1;
    d.setDate(d.getDate() + daysToExpiry);
    var info = {
        iss: { username: username, id: id },
        exp: d
    };
    return jwt.encode(info, config.token_secret);
}

function tokenData(data, done) {
    let token = data.body.token || data.headers.token || data.headers.authorization;
    if (token) {
        getTokenUserData(token, function(err, user) {
            if (user) {
                done(null, user);
            } else {
                done(new Error('No Valid token'), null);
            }
        });
    } else {
        done('');
    }
}

exports.createUser = function(req, res) {
    var data = req.body;
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: 'Error while searching for existing user'
            });
        } else if (user) {
            return res.status(400).send({
                message: 'User already exists'
            });
        } else {
            var user = new User(data);
            user.save(function(saveErr, saveRes) {
                if (saveErr) {
                    return res.status(400).send({
                        message: 'Error while saving the user'
                    });
                } else {
                    var token = genToken(req.body.username, saveRes._id);
                    res.jsonp({ token: token });
                }
            });
        }
    });
};