import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

let start, stop, result, unit

class Question extends Component {

    constructor(props) {
        super(props)

        this.state = {
            questions: [],
            questioncard: { category: '', question: '', correct_answer: '', incorrect_answers: [] },
            options: [],
            answer: '',
            save: { question: '', answered: '', correct: '' },
            next: 0,
            answers: [],
            gameoverRedirect: '/quiz'
        }
        this.answer = 0
    }

    start = () => {
        return new Date().getTime()
    }

    stop = () => {
        return new Date().getTime()
    }

    async componentDidMount() {
        try {

            if (this.props.location.user.login) {
                await axios.get(`/quiz`)
                    .then(async res => {
                        start = this.start()
                        await this.setState({
                            questions: [...res.data]
                        })
                        this.settingCard()
                    })
                    .catch(err => alert(err))
            } else {
                await this.setState({
                    gameoverRedirect: '/login'
                })
            }
        } catch (err) {
            await this.setState({
                gameoverRedirect: '/login'
            })
            alert('Cannot Access Unless Logged In!')
        }

    }

    stringConvert = (str) => {
        const text = document.createElement('textarea')
        text.innerHTML = str

        return text.value
    }

    settingCard = async () => {
        let questions = this.state.questions[this.state.next]
        await this.setState({
            questioncard: {
                category: this.stringConvert(questions.category),
                question: this.stringConvert(questions.question),
                correct_answer: this.stringConvert(questions.correct_answer),
                incorrect_answers: [...questions.incorrect_answers.map(txt => this.stringConvert(txt))]
            }
        })

        await this.setState({
            options: [this.state.questioncard.correct_answer, ...this.state.questioncard.incorrect_answers].sort(() => Math.random() - 0.5)
        })

    }

    handleSave = async () => {
        document.getElementById('save').style.display = 'none'
        await this.setState({
            save: {
                question: this.state.questioncard.question,
                answered: this.state.answer,
                correct: this.state.questioncard.correct_answer
            }
        })

        let correct_id = this.state.options.indexOf(this.state.save.correct)
        let answer_id = this.state.options.indexOf(this.state.save.answered)

        if (correct_id === answer_id) {
            document.getElementById(answer_id).style.backgroundColor = '#90f5ab'
        } else {
            document.getElementById(correct_id).style.backgroundColor = '#90f5ab'
            document.getElementById(answer_id).style.backgroundColor = '#ed7474'
        }


        document.getElementById('next').style.display = 'block'
    }

    handleNext = async () => {

        this.answer = 0

        let correct_id = this.state.options.indexOf(this.state.save.correct)
        let answer_id = this.state.options.indexOf(this.state.save.answered)

        if (correct_id === answer_id) {
            document.getElementById(answer_id).style.backgroundColor = ''
        } else {
            document.getElementById(correct_id).style.backgroundColor = ''
            document.getElementById(answer_id).style.backgroundColor = ''
        }

        await this.setState({
            answers: [...this.state.answers, this.state.save]
        })

        await this.setState({
            save: {
                question: '',
                answered: '',
                correct: ''
            }
        })

        await this.setState({
            answer: ''
        })

        await this.setState({
            next: this.state.next + 1
        })

        if (this.state.next < this.state.questions.length) {
            document.getElementById('next').style.display = 'none'
            this.settingCard()
        }
        else {
            stop = this.stop()
            result = Math.ceil((stop - start) / 1000)

            if(result > 60){
                result = Math.ceil(result / 60)
                unit = result > 1 ? 'minutes' : 'minute'
                result = result + ' ' + unit
            }else{
                unit = result > 1 ? 'seconds' : 'second'
                result = result + ' ' + unit
            }

            alert('Game Over!')

            await this.setState({
                timeTaken: result
            })

            await this.setState({
                gameoverRedirect: '/gameover'
            })
        }
    }

    handleAnswer = async (ans) => {
        this.answer += 1
        await this.setState({
            answer: ans
        })
        if (this.answer === 1) {
            document.getElementById('save').style.display = 'block'
        }
    }

    render() {
        
        const { questioncard, options } = this.state
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark m-2" style={{ color: 'white' }}>Quiz Game
                </nav>

                <div className="card container-fluid" style={{ height: '30rem', width: '25rem', alignContent: 'center', backgroundColor: '#dedfe0'}}>
                    <div className="card-body" style={{ height: '50rem' }}>
                        <h5 className="card-title">{questioncard.category}</h5>
                        <p className="card-text">{questioncard.question}</p>
                        <div className="list-group container-fluid" id="list-tab" role="tablist">
                            {options.map((option, index) => {
                                return (
                                    <button id={index} key={index} className="btn btn-light m-2" onClick={e => this.handleAnswer(option)}>{option}</button>
                                )
                            })}
                        </div>
                        <div >
                            <div id="save" style={{ display: 'none' }}>
                                <button className="btn btn-success m-2" onClick={e => this.handleSave()}>save</button>
                            </div>
                            <div id="next" style={{ display: 'none' }}>
                                <button className="btn btn-primary" onClick={e => this.handleNext()}>next</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Redirect exact to={{
                    pathname: this.state.gameoverRedirect,
                    timeTaken: this.state.timeTaken,
                    answers: [...this.state.answers],
                    user: this.props.location.user
                }}></Redirect>
            </div>
        )
    }
}

export default Question