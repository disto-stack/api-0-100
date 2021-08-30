const mongoose = require('mongoose');

const schema = require('../schemas/student.schema');
const db = require('../db-connection/mongodb');

db();

schema.statics = {
    create: function(data, callback) {
        let doc = new this(data);
        doc.save(callback);
    },
    getAll: function(query, callback) {
        this.find(query, callback);
    },
    getByCode: function(query, callback) {
        this.find(query, callback);
    },
    update: function(query, data, callback) {
        this.findOneAndUpdate(query, {$set: data}, { useFindAndModify: true }, callback);
    },
    delete: function(query, callback) {
        this.findOneAndDelete(query, callback);
    }
};

module.exports = mongoose.model('collection_student', schema);
