import axios from 'axios';


import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { 
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
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
        console.log('saga result', result)
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



function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout)
}



export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),

    ])
}

