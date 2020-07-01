import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: '/register'
        }
    }


    changeEmail = async (e) => {
        await this.setState({
            email: e.target.value
        })
    }

    changeName = async (e) => {
        await this.setState({
            name: e.target.value
        })
    }

    changePassword = async (e) => {
        await this.setState({
            password: e.target.value
        })
    }

    pwdReveal = () => {
        let id = document.getElementById('pwd');
        if (id.type === "password") {
            id.type = "text";
        } else {
            id.type = "password";
        }
    }

    onSubmit = async (e) => {
        e.preventDefault()

        const register = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        await axios.post(`/register`, register)
            .then(async res => {
                alert(res.data)
                if (res.data === 'Registered Successfully!') {
                    await this.setState({
                        redirect: '/login'
                    })
                }
            })
            .catch(err => alert(err))

        await this.setState({
            name: '',
            email: '',
            password: ''
        })

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ color: 'white' }}>Register</nav>
                <div className="row m-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form onSubmit={e => this.onSubmit(e)}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" required className="form-control" onChange={e => this.changeName(e)} value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" required className="form-control" onChange={e => this.changeEmail(e)} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label>Password: </label>
                                <input id="pwd" type="password" required className="form-control" onChange={e => this.changePassword(e)} value={this.state.password} />
                            </div>
                            <div className="form-group form-check">
                                <input onClick={this.pwdReveal} type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Show Password</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                If already registered click this link - <Link to={{ pathname: '/login' }}>Login</Link>
                    </div>
                    <div className="col-4"></div>
                </div>
                <Redirect exact to={{ pathname: this.state.redirect, state: { login: this.props.login } }}>
                </Redirect>
            </div>
        )
    }
}

export default Register