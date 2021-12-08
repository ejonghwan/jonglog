import axios from 'axios'
import { all, call, fork, put, takeEvery, takeLatest, getContext } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
    POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS, 
    POST_DELETE_FAILURE, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, 
    POST_DETAIL_LOADING_FAILURE,  POST_DETAIL_LOADING_REQUEST, POST_DETAIL_LOADING_SUCCESS, 
    POST_EDIT_LOADING_SUCCESS, POST_EDIT_LOADING_FAILURE, POST_EDIT_LOADING_REQUEST,
    UPLOAD_POST_FAILURE, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS, 
    POST_EDIT_UPLOADING_REQUEST, POST_EDIT_UPLOADING_SUCCESS, POST_EDIT_UPLOADING_FAILURE, CATEGORY_FIND_REQUEST, CATEGORY_FIND_SUCCESS, CATEGORY_FIND_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, 
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
        yield put(push('/'))
    }
}
function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}


// upload post
function uploadPostApi(data) {
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

    // console.log('이거 꼭 꼭: ', data, config)
    return axios.post('/api/post', data, config)
}
function* uploadPost(action) {
    try {
        // console.log('saga upload action', action)
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
        yield put(push('/'))
    }
}
function* watchuploadPost() {
    yield takeEvery(UPLOAD_POST_REQUEST, uploadPost)
}



// post detail
function loadPostDetailApi(data) {
    return axios.get(`/api/post/${data}`)
}
function* loadPostDetail(action) {
    try {
        const result = yield call(loadPostDetailApi, action.data)
        console.log('detail', result)
        yield put({
            type: POST_DETAIL_LOADING_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: POST_DETAIL_LOADING_FAILURE,
            data: err
        })
        yield put(push('/'))
    }
}
function* watchLoadPostDetail() {
    yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail)
}


// post delete
function postDeletelApi(data) {
    const config = {
        headers: {
            "Contnet-Type":"apllication/json"
        }
    }
    const token = data.token
    if(token) {
        config.headers["x-auth-token"] = token
    }

    return axios.delete(`/api/post/${data.id}`, config)
}
function* postDeletel(action) {
    try {
        const result = yield call(postDeletelApi, action.data)
        yield put({
            type: POST_DELETE_SUCCESS,
            data: result.data
        })
        yield put(push('/'))
    } catch(err) {
        yield put({
            type: POST_DELETE_FAILURE,
            data: err.msg
        })
    }
}
function* watchPostDeletel() {
    yield takeEvery(POST_DELETE_REQUEST, postDeletel)
}



// post edit load
function postEditLoadApi(data) {
    const config = {
        headers: {
            "Contnet-Type":"apllication/json"
        }
    }
    const token = data.token
    if(token) {
        config.headers["x-auth-token"] = token
    }

    return axios.get(`/api/post/${data.id}/edit`, config)
}
function* postEditLoad(action) {
    try {
        const result = yield call(postEditLoadApi, action.data)
        yield put({
            type: POST_EDIT_LOADING_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: POST_EDIT_LOADING_FAILURE,
            data: err.msg
        })
        yield put(push('/'))
    }
}
function* watchPostEditLoad() {
    yield takeEvery(POST_EDIT_LOADING_REQUEST, postEditLoad)
}




// post edit upload
function postEditUploadApi(data) {
    const config = {
        headers: {
            "Contnet-Type":"apllication/json"
        }
    }
    const token = data.token
    if(token) {
        config.headers["x-auth-token"] = token
    }

    return axios.post(`/api/post/${data.id}/edit`, data, config)
}
function* postEditUpload(action) {
    // console.log('여기 액션이 뭐냐 !!!!!!', action)
    try {
        const result = yield call(postEditUploadApi, action.data)
        yield put({
            type: POST_EDIT_UPLOADING_SUCCESS,
            data: result.data
        })
        yield put(push(`/post/${result.data._id}`))
    } catch(err) {
        yield put({
            type: POST_EDIT_UPLOADING_FAILURE,
            data: err.msg
        })
        yield put(push('/'))
    }
}
function* watchPostEditUpload() {
    yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditUpload)
}


// category find one
function categoryFindApi(data) {
    return axios.get(`/api/post/category/${encodeURIComponent(data)}`)
}
function* categoryFind(action) {
    // saga action은 컴포넌트의 dispatch data 넘겨준 값인데 ... 왜 안되지 ? 된다 돼 해결됨
    try {
        const result = yield call(categoryFindApi, action.data)
        // console.log('카테고리 파인드 사가', result)
        yield put({
            type: CATEGORY_FIND_SUCCESS,
            data: result.data
        })
        // yield put(push(`/post/${result.data._id}`))
    } catch(err) {
        yield put({
            type: CATEGORY_FIND_FAILURE,
            data: err.msg
        })
        // yield put(push('/'))
    }
}
function* watchCategoryFind() {
    yield takeEvery(CATEGORY_FIND_REQUEST, categoryFind)
}



// search request
function searchApi(data) {
    return axios.get(`/api/search/${encodeURIComponent(data)}`)
}
function* search(action) {
    
    try {
        const result = yield call(searchApi, action.data)
        console.log('숼취 사가', result)
        yield put({
            type: SEARCH_SUCCESS,
            data: result.data
        })
        yield put(push(`/search/${encodeURIComponent(action.data)}`))
    } catch(err) {
        yield put({
            type: SEARCH_FAILURE,
            data: err.msg
        })
        // yield put(push('/'))
    }
}
function* watchSearch() {
    yield takeEvery(SEARCH_REQUEST, search)
}







function* posts() {
    yield all([
        fork(watchLoadPosts),
        fork(watchuploadPost),
        fork(watchLoadPostDetail),
        fork(watchPostDeletel),
        fork(watchPostEditLoad),
        fork(watchPostEditUpload),
        fork(watchCategoryFind),
        fork(watchSearch),
    ])
}


export default posts;