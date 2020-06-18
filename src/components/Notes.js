import React from 'react'
import Signup from './Signup'
import Films from './Films'
import Planets from './Planets'
import Starship from './Starship'
import Transport from './Transport'
import './css/starWars.css'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

class StarWars extends React.Component {x
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                <ul className='menu'>
                    <li><NavLink activeClassName="active" exact to='/'>Characters</NavLink></li>
                    {/* <li><NavLink activeClassName="active" to='/films'>Films</NavLink></li>
                    <li><NavLink activeClassName="active" to='/planets'>Planets</NavLink></li>
                    <li><NavLink activeClassName="active" to='/starship'>Starships</NavLink></li>
                    <li><NavLink activeClassName="active" to='/transport'>Transport</NavLink></li> */}
                </ul>

                <Switch>
                    <Route path='/' exact component={Signup} />
                    <Route path='/films' component={Films} />
                    <Route path='/planets' component={Planets} />
                    <Route path='/starship' component={Starship} />
                    <Route path='/transport' component={Transport} />
                </Switch>
            </Router>
        )
    }
}

export default StarWars;