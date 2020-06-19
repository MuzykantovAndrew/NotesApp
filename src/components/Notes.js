import React from 'react'
import LogIn from '../Containers/LogInContainer'
import Signup from '../Containers/SignUpContainer'
import Main from '../Containers/MainContainer'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'


class Notes extends React.Component {x
    
    render() {
        return (
            <Router>
                <ul className='menu'>
                    <li><NavLink activeClassName="active" exact to='/'>LogIn</NavLink></li>
                    <li><NavLink activeClassName="active" to='/Signup'>Signup</NavLink></li>
                    <li><NavLink activeClassName="active" to='/Main'>TaskNote</NavLink></li>
                </ul>

                <Switch>
                    <Route path='/' exact component={LogIn} />
                    <Route path='/Signup' component={Signup} />
                    <Route path='/Main' component={Main} />
                    
                </Switch>
            </Router>
        )
    }
}

export default Notes;