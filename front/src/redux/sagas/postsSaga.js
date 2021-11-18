import axios from 'axios'
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {} from 'connected-react-router'
import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS } from '../types.js'

function loadPostsApi() {
    return axios.get('/api/post')
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsApi)
        
        yield put({
            type: POSTS_LOADING_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: POSTS_LOADING_FAILURE,
            data: err
        })
    }
}

function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}

function* posts() {
    yield all([
        fork(watchLoadPosts),
    ])
}


export default posts;