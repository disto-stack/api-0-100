const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection_course",
        required: true
    },
    period_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection_period",
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection_teacher",
        required: true
    },
    number: {
        type: "Number",
        required: true,
    }
});

module.exports = groupSchema;