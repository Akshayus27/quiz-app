import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            redirect: '/login'
        }
    }

    async componentDidMount() {
        await this.setState({
            login: this.props.login
        })
    }

    changeEmail = async (e) => {
        await this.setState({
            email: e.target.value
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

        const login = {
            email: this.state.email,
            password: this.state.password
        }

        await axios.post(`/login`, login)
            .then(async res => {
                if (res.status === 200) {
                    await this.setState({
                        user: {
                            email: res.data.email,
                            login: true,
                            points: res.data.points
                        },
                        login: true,
                        redirect: '/accounts'
                    })
                    alert('Logged In')
                } else {
                    alert('Incorrect email or password!')
                }
            })
            .catch(err => alert('Incorrect email or password!'))

        await this.setState({
            email: '',
            password: ''
        })

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ color: 'white' }}>Login</nav>
                <div className="row m-2">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form onSubmit={e => this.onSubmit(e)}>
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
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                If not already registered click this link - <Link to={{
                            pathname: '/register'
                        }}>Register</Link>
                    </div>
                    <div className="col-4"></div>
                </div>
                <Redirect exact to={{
                    pathname: this.state.redirect,
                    user: this.state.user,
                    name: 'hello'
                }}>
                </Redirect>
            </div>
        )
    }
}

export default Login