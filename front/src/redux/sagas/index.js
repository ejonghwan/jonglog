import { all, fork, } from 'redux-saga/effects' 
import axios from 'axios'
import dotenv from 'dotenv'

import authSaga from './authSaga.js'
import postSaga from './postsSaga.js'
import commentSaga from './commentSaga.js'



// axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL
axios.defaults.baseURL = 'http://localhost:3000'

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(commentSaga),
    ])
}