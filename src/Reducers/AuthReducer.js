import * as type from '../Actions/ActionType'

const reducer = (state = {}, action) => {
    switch(action.type){
        case type.CHANGE_INPUT:
            return { 
                ...state,
                [action.fieldName]: action.value
            }
        case type.LOG_IN_SUCCESS:
            window.localStorage.setItem('mytrellocredentials', action.token);
            window.localStorage.setItem('currentUserId', action.user.userId);
            return { 
                ...state,
                user: action.user,
                authCheck: true,
                errorMessage: null
            }
        case type.LOG_IN_ERROR:
            return { 
                ...state,
                authCheck: false,
                errorMessage: action.error
            }
        case type.Update_User_In_State:
            return { 
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;