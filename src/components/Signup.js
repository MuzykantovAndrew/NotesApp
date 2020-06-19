import React from 'react'
import { Link, useHistory } from "react-router-dom"

class Signup extends React.Component{
    state = {
        Name: "",
        LastName: "",
        Login: "",
        Password: "",
        Info : "",
        Role : "User"
    }
    

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
       
        let res = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(this.state)
        });
        let jsn = await res.json();

        if (jsn.success) {
            this.props.logInSuccess(jsn.data, jsn.data.token);
            this.props.history.push("/main")
        } else {
            this.props.logInError("This login is already in use");
            }
        
    }

    render(){
        return (
            <div className="sign-up-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Name" className="whiteText">Name</label>
                        <input  type="text"
                                className="form-control" 
                                id="Name" 
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Lastname" className="whiteText">LastName</label>
                        <input  type="text"
                                className="form-control"
                                id="Lastname" 
                                name="Lastname"
                                value={this.state.Lastname}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Info" className="whiteText">Info</label>
                        <input  type="text"
                                className="form-control"
                                id="Info" 
                                name="Info"
                                value={this.state.Info}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Login" className="whiteText">Login</label>
                        <input  type="text"
                                className="form-control"
                                id="Login" 
                                name="Login"
                                value={this.state.Login}
                                onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label whiteText" htmlFor="Password">Password</label>
                        <input type="password" className="form-control" id="Password"
                               name="Password"
                               value={this.state.Password}
                               onChange={this.handleChange}/>
                    </div>
                    <input type="submit" className="btn btn-info"/>
                    <hr className="hr-line"/>
                    <div className="form-group">
                        <Link className="link" to="/"><span>Already have an account? Log In</span></Link>
                    </div>
                    {!this.props.authCheck ? (
                                            <div className="alert alert-danger errorBlockShow">{this.props.errorMessage}</div>
                                        ) : null } 
                </form>
            </div>
            )
    }
}

export default Signup;