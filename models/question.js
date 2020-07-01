const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionsSchema = new Schema({
        category: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        correct_answer: {
            type: String,
            required: true
        },
        incorrect_answers: {
            type: Array,
            required: true
        }
})

module.exports = mongoose.model('Questions', QuestionsSchema)