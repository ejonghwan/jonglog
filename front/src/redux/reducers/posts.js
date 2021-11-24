import { 
    POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS,
    POST_DETAIL_LOADING_SUCCESS, POST_DETAIL_LOADING_FAILURE, POST_DETAIL_LOADING_REQUEST,
    POST_WRITE_FAILURE, POST_WRITE_REQUEST, POST_WRITE_SUCCESS, 
    UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS, UPLOAD_POST_FAILURE,

} from "../types";

const initialState = {
    posts: [],
    postDetail: '',
    postCount: '',
    loading: false,
    error: '',
    creatorId: '',
    categoryFindResult: '',
    title: '',
    searchBy: '',
    searchResult: '',
    isAuthenticated: false,
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            }
        case POSTS_LOADING_SUCCESS: 
            return {
                ...state,
                loading: false,
                posts:[...state.posts, ...action.data]
            }
        case POSTS_LOADING_FAILURE: 
            return {
                ...state,
                loading: false,
            }

        case UPLOAD_POST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPLOAD_POST_SUCCESS: 
            return {
                ...state,
                loading: false,
                posts: action.data,
                isAuthenticated: true,
            }
        case UPLOAD_POST_FAILURE: 
            return {
                ...state,
                error: action.data,
                loading: false,
            }

        case POST_WRITE_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            }
        case POST_WRITE_SUCCESS: 
            return {
                ...state,
                loading: false,
            }
        case POST_WRITE_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.data,
            }
        
        case POST_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            }
        case POST_DETAIL_LOADING_SUCCESS: 
            return {
                ...state,
                postDetail: action.data,
                creatorId: action.data.creator.id,
                title: action.data.title,
                loading: false,
            }
        case POST_DETAIL_LOADING_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.data,
            }
            
    
        default: return state;
    }
}


export default reducer;