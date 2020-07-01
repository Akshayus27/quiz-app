import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <li className="navbar-brand" >Quiz</li>
                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav">
                            <li className="nav-item nav-link" ><Link style={{textDecoration: 'none', color: 'white'}} to={{pathname: '/login', state: {login: this.props.login}}}>Login</Link></li>
                            <li className="nav-item nav-link" ><Link style={{textDecoration: 'none', color: 'white'}} to={{pathname: '/register', state: {login: this.props.login}}}>Register</Link></li>
                        </div>
                    </div>
                </nav>
                <div>
                    <h1 className="display-1" style={{textAlign: 'center'}}>WELCOME</h1>
                </div>
            </div>
        )
    }
}

export default Navbar