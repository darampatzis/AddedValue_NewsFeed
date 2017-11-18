const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    it: {
        itId: {
            type: String,
            unique: true
        },
        token: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        }
    },
    facebook: {
        facebookId: {
            type: String,
            unique: true
        },
        token: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
    },
    name: String,
    pref: []
});

const model = mongoose.model('User', userSchema);
module.exports = model;
