import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE, 
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
    USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOAD_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, PASSWORD_CHANGE_REQUEST, PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE,

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
    categorys: [],
    prevMsg: '',

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
                isAuthenticated: true,
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
                user: action.payload.user,
                userId: action.payload.user._id,
                userName: action.payload.user.name,
                userRole: action.payload.user.role,
                categorys: action.payload.categoryFindResult,
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
                isLoading: true,
            }
        case SIGNUP_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                // email: action.payload.email,
                // name: action.payload.name,
                // password: action.payload.password,
            }
        case SIGNUP_FAILURE: 
            return {
                ...state,
                isLoading: false,
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

        case PASSWORD_CHANGE_REQUEST: 
            return {
                ...state,
                isLoading: true,
            }
        case PASSWORD_CHANGE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                successMsg: action.data.data.success, //서버에서 보내준 success json
                errorMsg: '',
                prevMsg: '',
            }
        case PASSWORD_CHANGE_FAILURE: 
            return {
                ...state,
                isLoading: false,
                successMsg: '', //서버에서 보내준 success json
                errorMsg: action.data.data.match_error,
                prevMsg: '',
            }

        // ???
        case CLEAR_ERROR_REQUEST: 
            return {
                ...state,
            }
        case CLEAR_ERROR_SUCCESS: 
            return {
                ...state,
                errorMsg: '',
                prevMsg: '',
            }
        case CLEAR_ERROR_FAILURE: 
            return {
                ...state,
                errorMsg: 'clear error fail',
            }



        default: return state
    }
}


export default reducer