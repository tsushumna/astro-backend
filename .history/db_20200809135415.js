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
        var db = mongoose.connect(config.db, { serverSelectionTimeoutMS: 120000, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err) {
            if (err) {
                console.error(chalk.red('Could not connect to MongoDB!'));
                console.log(chalk.red(err));
            }
        });

    }
}
const getDbName = () => {
    return state.db;
}
module.exports = { connect, getDbName };