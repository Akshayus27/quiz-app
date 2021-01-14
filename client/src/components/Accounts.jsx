import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LogOut from './LogOut'

class Accounts extends Component {

    constructor(props) {
        super(props)

        this.state = {
           redirect: '/accounts'
        }
    }

    changeRoute = async () => {
        await this.setState({
            redirect: '/quiz'
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark m-2" style={{ color: 'white' }}>Quiz Game
                <button className="nav-item nav-link btn" onClick={this.changeRoute} style={{ textDecoration: 'none', color: 'white' }} >Play Game</button>
                <div style={{float: 'right'}}>
                <LogOut />
                </div>
                </nav>
                <div className="card container-fluid" style={{ width: "20rem", backgroundColor: '#dedfe0' }}>
                    <div className="card-body">
                        <h4 className="card-title">Account Details</h4>
                        <h6 className="card-subtitle mb-2 text-muted">________________________</h6>
                         <h6 className="card-text" >Email: {this.props.location.user.email}</h6>
                         <h6 className="card-text" >Points: {this.props.location.user.points}</h6>
                    </div>
                </div>
                <Redirect  exact to={{ pathname: this.state.redirect, user: this.props.location.user  }} />
            </div>
        )
    }
}

export default Accounts