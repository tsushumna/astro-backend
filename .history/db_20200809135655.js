const MongoClient = require('mongodb').MongoClient;
const dbname = 'mongo_crud';
const url = 'mongodb://localhost:27017/mongo_crud';
const mongoOptions = { useUnifiedTopology: true };
const state = {
    db: null
}
var mongoose = require('mongoose');
const connect = (done) => {
    if (state.db) {
        done();
    } else {
        var db = mongoose.connect(url, { serverSelectionTimeoutMS: 120000, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err) {
            if (err) {
                done(err, null);
            } else {
                done(null);
            }
        });

    }
}
const getDbName = () => {
    return state.db;
}
module.exports = { connect, getDbName };