import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS, 
    COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS, COMMENT_UPLOADING_FAILURE,
} from '../types.js'




// load commnet
function loadCommentApi(data) {
    return axios.get(`/api/post/${data}/comments`)
}


function* loadComment(action) {
    try {
        const result = yield call(loadCommentApi, action.data);
        yield put({
            type: COMMENT_LOADING_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: COMMENT_LOADING_FAILURE,
            data: err.response,
        })
    }
}

function* watchLoadComment() {
    yield takeEvery(COMMENT_LOADING_REQUEST, loadComment)
}




// upload commnet
function uploadCommentApi(data) {
    // console.log('업로드 사가 데이터??', data)
    return axios.post(`/api/post/${data.postId}/comments`, data)
}


function* uploadComment(action) {
    try {
        const result = yield call(uploadCommentApi, action.data);
        // console.log(result)
        yield put({
            type: COMMENT_UPLOADING_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: COMMENT_UPLOADING_FAILURE,
            data: err.response,
        })
    }
}

function* watchupLoadComment() {
    yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComment)
}



export default function* commentSaga() {
    yield all([
        fork(watchLoadComment),
        fork(watchupLoadComment),

    ])
}

