import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"
import Question from './components/Question'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import GamOver from './components/GameOver'
import Accounts from './components/Accounts'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: false
    }
  }

  render() {
    return (
      <div className="container">
        <Switch>

          <Route exact path="/gameover" render={props => (<GamOver {...props} />)} />

          <Route exact path="/" render={props => (<Navbar {...props} />)} />

          <Route exact path="/quiz" render={props => (<Question {...props} />)} />

          <Route exact path="/register" render={props => (<Register {...props} login={this.state.login} />)} />

          <Route exact path="/login" render={props => (<Login {...props} login={this.state.login} />)} />

          <Route exact path="/accounts" render={props => (<Accounts {...props} login={this.state.login} />)} />

        </Switch>
      </div>
    )
  }
}

export default App