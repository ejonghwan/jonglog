
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS,
    COMMENT_UPLOADING_FAILURE, COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS,
    RECOMMENT_UPLOAD_REQUEST, RECOMMENT_UPLOAD_SUCCESS, RECOMMENT_UPLOAD_FAILURE, COMMENT_EDIT_REQUEST, COMMENT_EDIT_SUCCESS, COMMENT_DELETE_FAILURE,
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


        case RECOMMENT_UPLOAD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RECOMMENT_UPLOAD_SUCCESS: 
            return {
                ...state,
                loading: false,
            }
        case RECOMMENT_UPLOAD_FAILURE: 
            return {
                ...state,
                loading: false,
            }



        // get comment api 만들어야됨
        case COMMENT_EDIT_REQUEST:
            return {
                ...state,
                creatorId:'comment edit succ',
                loading: true,
            }
        case COMMENT_EDIT_SUCCESS: 
            return {
                ...state,
                comments: action.data,
                loading: false,
            }
        case COMMENT_DELETE_FAILURE: 
            return {
                ...state,
                loading: false,
            }
            
    
        default: return { ...state };
    }
}

export default reducer;