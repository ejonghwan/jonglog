import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push,  } from 'connected-react-router'
import axios from 'axios';
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS, 
    COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS, COMMENT_UPLOADING_FAILURE,
    RECOMMENT_UPLOAD_REQUEST, RECOMMENT_UPLOAD_SUCCESS, RECOMMENT_UPLOAD_FAILURE, 
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
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // const token = data.token
    const token = localStorage.getItem('token')
    if(token) {
        config.headers["x-auth-token"] = token
    }
    // console.log('업로드 사가 데이터??', data)
    return axios.post(`/api/post/${data.postId}/comments`, data, config)
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







// recomment 
function recommentApi(data) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['x-auth-token'] = token;
    }
    console.log('리코멘트 리덕스 사가쪽 콘피그', config)

    return axios.post(`/api/post/comment/recomment`, data, config)
}

function* recomment(action) {
    try {
        const result = yield call(recommentApi, action.data)
        console.log('리코멘트 사과', result)
        yield put({
            type: RECOMMENT_UPLOAD_SUCCESS,
            data: result.data
        })
        // yield put(push(`/post/${result.data.post}`)) 이거아이다
    } catch(err) {
        yield put({
            type: RECOMMENT_UPLOAD_FAILURE,
            data: err.msg
        })
        // yield put(push('/'))
    }
}
function* watchRecomment() {
    yield takeEvery(RECOMMENT_UPLOAD_REQUEST, recomment)
}






export default function* commentSaga() {
    yield all([
        fork(watchLoadComment),
        fork(watchupLoadComment),
        fork(watchRecomment),

    ])
}

