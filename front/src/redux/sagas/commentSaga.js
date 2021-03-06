import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push,  } from 'connected-react-router'
import axios from 'axios';
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS, 
    COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS, COMMENT_UPLOADING_FAILURE,
    RECOMMENT_UPLOAD_REQUEST, RECOMMENT_UPLOAD_SUCCESS, RECOMMENT_UPLOAD_FAILURE, COMMENT_EDIT_SUCCESS, COMMENT_EDIT_FAILURE, COMMENT_EDIT_REQUEST, COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE, RECOMMENT_EDIT_SUCCESS, RECOMMENT_EDIT_FAILURE, RECOMMENT_EDIT_REQUEST, 
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



// edit commnet
function editCommentApi(data) {
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
    return axios.post(`/api/post/comment/edit`, data, config)
}


function* editComment(action) {
    try {
        const result = yield call(editCommentApi, action.data);
        // console.log(result)
        yield put({
            type: COMMENT_EDIT_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: COMMENT_EDIT_FAILURE,
            data: err.response,
        })
    }
}

function* watchEditComment() {
    yield takeEvery(COMMENT_EDIT_REQUEST, editComment)
}


// delete commnet
function deleteCommentApi(data) {
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
    return axios.post(`/api/post/comment/delete`, data, config)
}


function* deleteComment(action) {
    try {
        const result = yield call(deleteCommentApi, action.data);
        // console.log(result)
        yield put({
            type: COMMENT_DELETE_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: COMMENT_DELETE_FAILURE,
            data: err.response,
        })
    }
}

function* watchDeleteComment() {
    yield takeEvery(COMMENT_DELETE_REQUEST, deleteComment)
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
    // console.log('리코멘트 리덕스 사가쪽 콘피그', config)

    return axios.post(`/api/post/comment/recomment`, data, config)
}

function* recomment(action) {
    try {
        const result = yield call(recommentApi, action.data)
        // console.log('리코멘트 사과', result)
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


// recomment edit
function recommentEditApi(data) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['x-auth-token'] = token;
    }
    // console.log('리코멘트 리덕스 사가쪽 콘피그', config)

    return axios.put(`/api/post/comment/recomment/edit`, data, config)
}

function* recommentEdit(action) {
    try {
        const result = yield call(recommentEditApi, action.data)
        console.log('리코멘트 사과', result)
        yield put({
            type: RECOMMENT_EDIT_SUCCESS,
            data: result.data
        })
        // yield put(push(`/post/${result.data.post}`)) 이거아이다
    } catch(err) {
        yield put({
            type: RECOMMENT_EDIT_FAILURE,
            data: err.msg
        })
        // yield put(push('/'))
    }
}
function* watchRecommentEdit() {
    yield takeEvery(RECOMMENT_EDIT_REQUEST, recommentEdit)
}






export default function* commentSaga() {
    yield all([
        fork(watchLoadComment),
        fork(watchupLoadComment),
        fork(watchRecomment),
        fork(watchEditComment),
        fork(watchDeleteComment),
        fork(watchRecommentEdit),
    ])
}

