const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    document: {
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
    office: {
        type: "String",
        required: true
    },
    department: {
        type: "String",
        required: true
    }
});

teacherSchema.plugin(require('mongoose-unique-validator'));
module.exports = teacherSchema;