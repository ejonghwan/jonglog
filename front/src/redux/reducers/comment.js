
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS,
    COMMENT_UPLOADING_FAILURE, COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS 
} from '../types.js';


const initialState = {
    comments: [],
    creatorId: '',
    loading: false,
    isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_LOADING_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case COMMENT_LOADING_SUCCESS: {
            return {
                ...state,
                loading: false,
                comments: action.data,
            }
        }

        case COMMENT_LOADING_FAILURE: {
            return {
                ...state,
                loading: false,
                
            }
        }

        case COMMENT_UPLOADING_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }

        case COMMENT_UPLOADING_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                comments: [...state.comments, action.data],
            }
        }

        case COMMENT_UPLOADING_FAILURE: {
            return {
                ...state,
                loading: false,
            }
        }
            
    
        default: return { ...state };
    }
}

export default reducer;