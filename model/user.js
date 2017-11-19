const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    pref: [],
    accounts: {
        facebook: {
            id: {
                type: String,
                unique: true
            },
            token: {
                type: String,
                unique: true
            },
        },
        it: {
            id: {
                type: String,
                unique: true
            },
            token: {
                type: String,
                unique: true
            }
        }
    }
});

const model = mongoose.model('User', userSchema);
module.exports = model;
