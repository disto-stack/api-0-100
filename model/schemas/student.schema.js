const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    code: {
        type: "String",
        required: true,
        unique: true
    },
    name: {
        type: "String",
        required: true
    },
    lastName: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique: true
    },
    phone: {
        type: "String",
        required: true
    },
    career: {
        type: "String",
        required: true
    }
});

studentSchema.plugin(require('mongoose-unique-validator'));
module.exports = studentSchema;