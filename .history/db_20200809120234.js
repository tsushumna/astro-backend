const MongoClient = require('mongodb').MongoClient;
const dbname = 'mongo_crud';
const url = 'mongodb://localhost:27017/mongo_crud';
const mongoOptions = { useUnifiedTopology: true };
const state = {
    db: null
}
const connect = (done) => {
    if (state.db) {
        done();
    } else {
        MongoClient.connect(url, mongoOptions, (err, db) => {
            if (err) {
                done(err);
            } else {
                state.db = dbname;
                // db.db(dbname);
                console.log(state.db);
                done(null, db);
            }
        });
    }
}
const getDbName = () => {
    return state.db;
}
module.exports = { connect, getDbName };