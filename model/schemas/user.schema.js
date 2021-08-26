const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    lastName: {
        type: "String",
        required: true
    },
    username: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    role: {
        type: "Number",
        required: true
    }
});

userSchema.plugin(require('mongoose-unique-validator'));
module.exports = userSchema;