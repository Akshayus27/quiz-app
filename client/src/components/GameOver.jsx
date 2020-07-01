import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class GameOver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            answers: [],
            currentPoints: 0,
            redirect: '/gameover',
            accounts: '/gameover'
        }
    }

    async componentDidMount() {

        try {
            if (this.props.location.answers) {

                await this.setState({
                    answers: [...this.props.location.answers]
                })

                for (let ans of this.state.answers) {
                    if (ans.correct === ans.answered) {
                        await this.setState({
                            currentPoints: this.state.currentPoints + 1
                        })
                    }
                }

                await axios.put(`/gameover/${this.props.location.user.email}/${this.props.location.user.points + this.state.currentPoints}`)
                    .then()
                    .catch(err => alert(err))
            } else {
                this.goBackToGame()
            }
        } catch (err) {
            await this.setState({
                login: false
            })
            alert('Page not Accessible!')
            this.goBackToGame()
        }

    }

    goBackToGame = async () => {
        await this.setState({
            redirect: '/quiz'
        })
    }

    goToAccounts = async () => {
        await this.setState({
            accounts: '/accounts'
        })
    }

    render() {
        const { answers } = this.state
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ color: 'white' }}>Game Over
                <button className="nav-item nav-link btn" onClick={this.goToAccounts} style={{ textDecoration: 'none', color: 'white' }}>Accounts</button>
                </nav>
                <div className="row m-2">
                    <div className="row col-12">
                        <div className="col-3"></div>
                        <div className="col-3">
                            <h5>Game Points : {this.state.currentPoints}</h5>
                            <button className="btn btn-success" onClick={this.goBackToGame}>Play Again</button>
                            <h6 style={{marginTop: '2px'}}>Time Taken : {this.props.location.timeTaken}</h6>
                        </div>
                        <div className="col-6">
                                <div className="card container-fluid" style={{ width: "10rem" , backgroundColor: '#dedfe0'}}>
                                    <div className="card-body">
                                         <p className="card-text" style={{fontWeight: 'bold'}}>Email: {this.props.location.user.email}</p>
                                         <p className="card-text" style={{fontWeight: 'bold'}}>Points: {this.props.location.user.points + this.state.currentPoints}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        {answers.map((answer, index) => {
                            return (
                                <div key={index} className="card container-fluid" id="game" style={{ height: '25rem', width: '25rem', alignContent: 'center', backgroundColor: answer.correct === answer.answered ? '#90f5ab' : '#ed7474', marginTop: '2rem' }}>
                                    <div className="card-body" style={{ height: '50rem' }}>
                                        <h5 className="card-title">{answer.question}</h5>
                                        <div className="list-group container-fluid">
                                        <h6>Answered:</h6> <li className="list-group-item" style={{fontWeight: 'bold'}}>{answer.answered}</li>
                                        <h6>Correct:</h6> <li className="list-group-item" style={{fontWeight: 'bold'}}>{answer.correct}</li>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Redirect exact to={{
                        pathname: this.state.accounts,
                        user: {
                            email: this.props.location.user.email,
                            login: this.props.location.user.login,
                            points: this.props.location.user.points + this.state.currentPoints
                        }
                    }} />
                    <Redirect exact to={{
                        pathname: this.state.redirect,
                        timeTaken: this.props.location.timeTaken,
                        user: {
                            email: this.props.location.user.email,
                            login: this.props.location.user.login,
                            points: this.props.location.user.points + this.state.currentPoints
                        }
                    }} />
                </div>
        )
    }
}

export default GameOver
