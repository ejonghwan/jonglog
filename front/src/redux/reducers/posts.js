import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS } from "../types";

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
            
    
        default: return state;
    }
}


export default reducer;