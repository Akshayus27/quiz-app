import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class LogOut extends Component{

    constructor(props) {
        super(props)

        this.state = {
           redirect: '/accounts',
           logOut: '/accounts'
        }
    }

    logOut = async () => {
        await this.setState({
            logOut: '/'
        })
    }

    render(){
        return(
            <div>
                <button className="btn" onClick={this.logOut} style={{ textDecoration: 'none', color: 'white' }} >LogOut</button>
                <Redirect  exact to={{
                    pathname: this.state.logOut,
                    login: false
                    }}/>
            </div>
        )
    }
}

export default LogOut