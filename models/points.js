const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PointSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Point', PointSchema)