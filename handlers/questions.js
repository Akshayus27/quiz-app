const fetch = require('node-fetch')
const Questions = require('../models/question')

exports.quiz = async(req, res) => {
    const results = await fetch('https://opentdb.com/api.php?amount=10')
               .then(response => response.json())
               .then(data => data.results)

    let questions = [...results]
    for(let que of questions){
        let quiz = new Questions({
            category: que.category,
            question: que.question,
            correct_answer: que.correct_answer,
            incorrect_answers: que.incorrect_answers
        })
        quiz.save(err => {
            if(err) return res.sendStatus(401)

            if(!Questions.findOne({question: quiz.question})) res.sendStatus(200)
        })
    }
    res.send(questions)
}