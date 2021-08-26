const mongoose = require('mongoose');

const studentgGroupSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection_student",
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection_group",
        required: true
    }
});

module.exports = studentgGroupSchema;