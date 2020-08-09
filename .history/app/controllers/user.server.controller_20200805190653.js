var mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    User = mongoose.model('User'),
    ToDo = mongoose.model('ToDo');

function genToken(username, id) {
    var d = new Date();
    var daysToExpiry = 1;
    d.setDate(d.getDate() + daysToExpiry);
    var info = {
        iss: { username: username, id: id },
        exp: d
    };
    return jwt.encode(info, 'token_secret');
}

function isValidToken(token) {
    var info = jwt.decode(token, 'token_secret');
    if (new Date(info.exp) > Date.now()) {
        return info.iss;
    }
    return false;
}

function getTokenUserData(token, done) {
    var reqUser = isValidToken(token);
    if (reqUser) {
        User.findOne({ 'username': reqUser.username, '_id': reqUser.id, deleted: false, disabled: false }, '-salt -password', function(err, user) {
            if (err) {
                done(err);
            } else if (user) {
                done(null, user);
            } else {
                done(new Error('No user with username - ' + reqUser.username + ', id-' + reqUser.id));
            }
        });
    } else {
        done(new Error('Session Expired.'));
    }
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
exports.sigin = function(req, res) {
    var data = req.body;
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: 'Error while searching for existing user'
            });
        } else if (user) {
            if (user.password === data.password) {
                var token = genToken(user.username, user._id);
                res.jsonp({ token: token });
            }
        } else {
            return res.status(400).send({
                message: 'User doesnt exists'
            });
        }
    });
};

exports.createList = function(req, res) {
    tokenData(req, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: 'Something went wrong'
            });
        } else if (user) {
            if (req.body.title && req.body.description) {
                var todo = new ToDo(req.body);
                todo.user = user._id;
                todo.save(function(saveErr, toDoRes) {
                    if (saveErr) {
                        return res.status(400).send({
                            message: 'Something went wrong'
                        });
                    } else {
                        res.jsonp(toDoRes);
                    }
                });
            } else {
                return res.status(400).send({
                    message: 'Enter all manditory fields'
                });
            }
        } else {
            return res.status(400).send({
                message: 'Not a valid user'
            });
        }
    });
};
exports.update = function(req, res) {
        tokenData(req, function(err, user) {
                if (err) {
                    return res.status(400).send({
                        message: 'Something went wrong'
                    });
                } else if (user) {
                    if (req.body.title || req.body.description) {
                        ToDo.findOne({ _id: req.body._id }, function(toDoErr, toDoData) {
                                if (toDoErr) {
                                    return res.status(400).send({
                                        message: 'Something went wrong'
                                    });
                                });
                        }
                        else {
                            return res.status(400).send({
                                message: 'No fields to update'
                            });
                        }
                    } else {
                        return res.status(400).send({
                            message: 'Not a valid user'
                        });
                    }
                });
        };