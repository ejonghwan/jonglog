import axios from 'axios';


import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';



function loginUserApi(loginData) {
    console.log(loginData, "loginData")
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('/api/auth', loginData, config)
}


function* loginUser(action) {
    try {
        const result = yield call(loginUserApi, action.payload);
        console.log(result)
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

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
    ])
}

