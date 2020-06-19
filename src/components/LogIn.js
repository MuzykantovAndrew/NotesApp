import React from 'react'


import { Link, useHistory } from "react-router-dom"

function LogIn(props) {
    const history = useHistory();

    const log_in = async function (login, password) {
        let url = "http://localhost:5000/api/auth/authenticate";
        let credentials = {
            'Login': login,
            'Password': password,
            'Name': "John",
            'Lastname': "Wick",
            'Role': "User",
            'Info': "killer"
        }

        await fetch(url, { 
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type':'application/json' }
        }).then(response => {
            response.json().then((res) =>{
                if (res.success) {
                    props.logInSuccess(res.data, res.data.token);
                    history.push("/main")
                } else {
                    props.logInError(res.message);
                }
                
            });
        })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="log-in-container">
            <form>
                <div className="form-group">
                    <label htmlFor="login" className="whiteText">login</label>
                    <input type="text"
                        placeholder=""
                        className="form-control"
                        id="login"
                        name="login"
                        value={props.login}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-check-label whiteText" htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="login_password"
                        name="password"
                        value={props.password}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}
                    />
                </div>
                <input type="button"
                    className="btn btn-info"
                    id="login_btn"
                    onClick={() => log_in(props.login, props.password)}
                    value="Continue" />

                <hr className="hr-line" />
                <div className="form-group">
                    <Link className="link" to="/signUp"><span>Sign up for an account</span></Link>
                </div>
                {!props.authCheck ? (
                    <div className="alert alert-danger errorBlockShow">{props.errorMessage}</div>
                ) : null}
            </form>
        </div>
    )
};


export default LogIn;