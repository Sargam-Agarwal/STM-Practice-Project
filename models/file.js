const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    fileURL: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const File = mongoose.model('FileCollections', fileSchema);

module.exports = File;