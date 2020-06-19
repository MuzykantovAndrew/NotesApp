import { connect } from 'react-redux'
import { changeInput, logInSuccess, logInError } from '../Actions/ActionCreators'
import page from '../components/LogIn'

function mapStateToProps(state){
    return {
        login: state.auth.login,
        password: state.auth.password,
        authCheck: state.auth.authCheck,
        errorMessage: state.auth.errorMessage
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name)),
        logInSuccess: (user, token) => dispatch(logInSuccess(user, token)),
        logInError: (error) => dispatch(logInError(error))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const LogInPage = func(page);

export default LogInPage;