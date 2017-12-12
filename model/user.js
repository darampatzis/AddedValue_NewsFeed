const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
        pref: [],
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    it: {
        id: String,
        token: String,
        name: String,
        email: String,
        pref: [],
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
});

const model = mongoose.model('User', userSchema);
module.exports = model;
