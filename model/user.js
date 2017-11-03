const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
        id: {
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
    name: String
    /* NEW
     * , apps: {
     *     id: {
     *         type: String,
     *         unique: true
     *     },
     *     token: {
               type: String,
               unique: true
        },
     *     ....
     * }
     */
});

const model = mongoose.model('User', userSchema);
module.exports = model;
