const mongoose = require('mongoose');
mongoose.Promise = Promise; // fixes deprecation warning. Don't know why
const config = require('./config');

mongoose.connect(config.database.url, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Error'));
db.once('openUri', function () {
    console.log('Xwris deprecation warning =D');
});