const mongoose = require("mongoose")

const data = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    linkId: {
        type: Number,
        unique: true
    },
    linkTitle: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true
    }

}, { collection: 'Links-Data' })

module.exports = mongoose.model('data', data)