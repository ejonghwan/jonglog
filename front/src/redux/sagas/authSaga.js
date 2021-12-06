import axios from 'axios';


import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { 
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    USER_LOAD_FAILURE, USER_LOAD_REQUEST, USER_LOAD_SUCCESS,
} from '../types';



function loginUserApi(loginData) {
    // console.log(loginData, "loginData")
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('/api/auth', loginData, config)
    // return axios.post('http://localhost:3000/api/auth',loginData, config)
}


function* loginUser(action) {
    try {
        const result = yield call(loginUserApi, action.data);
        // console.log('saga result', result)
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch(err) {
        yield put({
            type: LOGIN_FAILURE,
            payload: err.response,
        })
    }
}




function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch(err) {
        yield put({
            type: LOGOUT_FAILURE,
        })
    }
}



function userLoadApi(tokenData) {
    // console.log(loginData, "loginData")
    const token = tokenData;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if(token) {
        config.headers["x-auth-token"] = token
    }
    return axios.get('/api/auth/user', config)
}


function* userLoad(action) {
    try {
        const result = yield call(userLoadApi, action.data);
        // console.log('saga userloading', result)
        yield put({
            type: USER_LOAD_SUCCESS,
            payload: result.data
        })
    } catch(err) {
        yield put({
            type: USER_LOAD_FAILURE,
            payload: err.response,
        })
    }
}


function signupApi(userData) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    console.log('saga: ', userData.data)
    return axios.post('/api/user', userData.data, config)
}

function* signupUser(data) {
    const result = yield call(signupApi, data)
    try {
        yield put({
            type: SIGNUP_SUCCESS,
            data: result.data
        })
    } catch(err) {
        console.log(err)
    }
}



function* clearerror() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
            // data: result.data
        })
    } catch(err) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
            // data: result.data
        })
    }
}



function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout)
}

function* watchUserload() {
    yield takeEvery(USER_LOAD_REQUEST, userLoad)
}

function* watchSignup() {
    yield takeEvery(SIGNUP_REQUEST, signupUser)
}

function* errorClear() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearerror)
}


export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchUserload),
        fork(watchSignup),
        fork(errorClear),

    ])
}

