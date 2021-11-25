import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE, 
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
    USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOAD_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,

} from '../types.js'



const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: '',
    userId: '',
    userName: '',
    userRole: '',
    errorMsg: '',
    successMsg: '',
    dimd: null,

}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        
        case LOGIN_REQUEST: 
        case LOGOUT_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem('token', action.payload.token);
            // console.log('reducer data', action.payload)
            return {
                ...state,
                ...action.payload,
                isAuthhenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: '',
                dimd: document.body.classList.remove('dimd'),
            }
        case LOGIN_FAILURE: 
        case LOGOUT_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload,
            }

        case LOGOUT_SUCCESS: 
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: '',
            }
        
        case USER_LOAD_REQUEST: 
            return {
                ...state,
                isloading: true,
            }
        case USER_LOAD_SUCCESS: 
            return {
                ...state,
                isloading: false,
                isAuthenticated: true,
                user: action.payload,
                userId: action.payload._id,
                userName: action.payload.name,
                userRole: action.payload.role,
            }
        case USER_LOAD_FAILURE: 
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: null,
            }

        case SIGNUP_REQUEST: 
            return {
                ...state,
                isloading: true,
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
                isloading: false,
                // email: action.payload.email,
                // name: action.payload.name,
                // password: action.payload.password,
            }
        case SIGNUP_FAILURE: 
            return {
                ...state,
                isloading: false,
            }



        case CLEAR_ERROR_REQUEST: 
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_SUCCESS: 
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_FAILURE: 
            return {
                ...state,
                errorMsg: null,
            }



        default: return state
    }
}


export default reducer