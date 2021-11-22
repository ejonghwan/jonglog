import axios from 'axios'
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
    POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS, 
    UPLOAD_POST_FAILURE, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS
} from '../types.js'

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
        yield push('/')
    }
}


// upload post

function uploadPostApi(data) {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const token = data.token;
    if(token) {
        config.headers["x-auth-token"] = token
    }
    return axios.post('/api/post', data, config)
}
function* uploadPost(action) {
    try {
        console.log('saga upload action', action)
        const result = yield call(uploadPostApi, action.data)
        console.log('saga upload result', result)
        yield put({
            type: UPLOAD_POST_SUCCESS,
            data: result.data
        })
        yield put(push(`/post/${result.data._id}`)) // 성공시 해당 아이디 적혀있는 디테일페이지로 
    } catch(err) {
        yield put({
            type: UPLOAD_POST_FAILURE,
            data: err
        })
        yield push('/')
    }
}


function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}
function* watchuploadPost() {
    yield takeEvery(UPLOAD_POST_REQUEST, uploadPost)
}

function* posts() {
    yield all([
        fork(watchLoadPosts),
        fork(watchuploadPost),
    ])
}


export default posts;