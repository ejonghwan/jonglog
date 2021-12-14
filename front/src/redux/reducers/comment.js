
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
        case RECOMMENT_UPLOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
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
                edit: false,
            }
        case COMMENT_EDIT_SUCCESS:  {
            let idx = 0;
            for(let i = 0; i < state.comments.length; i++) {
                if(state.comments[i]._id === action.data._id) {
                    idx = i
                    break
                }
            }
            state.comments.splice(idx, 1, {...action.data, edit: true},);
            // console.log(idx)
            // console.log(state.comments)
            // console.log(action.data)
           
            return {
                ...state,
                // comments: [...state.comments ], // ? 상태안바꾸고 해도되나 ..? 
                loading: false,
                
            }
        }
        case COMMENT_DELETE_FAILURE: 
            return {
                ...state,
                loading: false,
                edit: false,
            }
            
    
        default: return { ...state };
    }
}

export default reducer;