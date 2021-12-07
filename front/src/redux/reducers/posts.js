import { useSelector } from "react-redux";
import { 
    POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS,
    POST_DETAIL_LOADING_SUCCESS, POST_DETAIL_LOADING_FAILURE, POST_DETAIL_LOADING_REQUEST,
    POST_WRITE_FAILURE, POST_WRITE_REQUEST, POST_WRITE_SUCCESS, 
    UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS, UPLOAD_POST_FAILURE, POST_EDIT_LOADING_REQUEST, POST_EDIT_LOADING_SUCCESS, POST_EDIT_LOADING_FAILURE, POST_EDIT_UPLOADING_REQUEST, POST_EDIT_UPLOADING_FAILURE, POST_EDIT_UPLOADING_SUCCESS, CATEGORY_FIND_REQUEST, CATEGORY_FIND_SUCCESS, CATEGORY_FIND_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE,

} from "../types";

// const { user } = useSelector(state => state.user)

const initialState = {
    posts: [],
    postDetail: '',
    postCount: '',
    loading: false,
    error: '',
    creatorId: '',
    categoryFindResult: [],
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
                posts:[...state.posts, ...action.data.postFindResult],
                categoryFindResult: action.data.categoryFindResult
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
                creatorId: action.data.creator._id,
                title: action.data.title,
                loading: false,
            }
        case POST_DETAIL_LOADING_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.data,
            }

        case POST_EDIT_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            }
        case POST_EDIT_LOADING_SUCCESS: 
            return {
                ...state,
                postDetail: action.data,
                loading: false,
            }
        case POST_EDIT_LOADING_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.data,
            }

        case POST_EDIT_UPLOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case POST_EDIT_UPLOADING_SUCCESS: 
            return {
                ...state,
                posts: action.data,
                isAuthenticated: true,
                loading: false,
            }
        case POST_EDIT_UPLOADING_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.data,
            }
        
        case CATEGORY_FIND_REQUEST:
            return {
                ...state,
                posts: [], // 빈배열로 만드는게 최선? 기존에 찾은것과 중복돼서..
                loading: true,
            }
        case CATEGORY_FIND_SUCCESS: 
            return {
                ...state,
                categoryFindResult: action.data,
                loading: false,
            }
        case CATEGORY_FIND_FAILURE: 
            return {
                ...state,
                loading: false,
                categoryFindResult: action.data,
                error: action.data,
            }

        case SEARCH_REQUEST:
            return {
                ...state,
                posts: [], 
                searchBy: action.data, // 무엇을 검색했는지를 넘겨받음
                loading: true,
            }
        case SEARCH_SUCCESS: 
            return {
                ...state,
                searchResult: action.data,
                searchBy: action.data,
                loading: false,
            }
        case SEARCH_FAILURE: 
            return {
                ...state,
                loading: false,
                searchResult: action.data,
            }
                
    
        default: return state;
    }
}


export default reducer;