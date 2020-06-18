import React from 'react'
import Loading from './Loading';

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        var url = "http://localhost:5000/api/user/{id}";
        this.setState({
            isLoading: true
        })

        var response = await fetch(url);
        var data = await response.json();

        console.log(data)
        this.setState({
            characters: [...this.state.characters, ...data.results],
            isLoading: false
        })
    }

    render() {
        return (
            <ul style={{ padding: 0 }}>
                {
                    this.state.isLoading ? <Loading /> : this.state.characters.map(character => <li className='list' >{character.name}</li>)
                }
            </ul>
        )
    }
}

export default Users;