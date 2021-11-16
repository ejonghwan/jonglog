import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE
} from '../types.js'



const initialState = {
    token: localStorage.getItem('token'),
    isAuthhenticated: null,
    isLoading: false,
    user: '',
    userId: '',
    userName: '',
    userRole: '',
    errorMsg: '',
    successMsg: '',

}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: 
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem(action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthhenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: '',
            }
        case LOGIN_FAILURE: 
            localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthhenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload.data.msg,
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