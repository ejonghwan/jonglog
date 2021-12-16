
import { 
    COMMENT_LOADING_FAILURE, COMMENT_LOADING_REQUEST, COMMENT_LOADING_SUCCESS,
    COMMENT_UPLOADING_FAILURE, COMMENT_UPLOADING_REQUEST, COMMENT_UPLOADING_SUCCESS,
    RECOMMENT_UPLOAD_REQUEST, RECOMMENT_UPLOAD_SUCCESS, RECOMMENT_UPLOAD_FAILURE, COMMENT_EDIT_REQUEST, COMMENT_EDIT_SUCCESS, COMMENT_DELETE_FAILURE, COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS, COMMENT_EDIT_FAILURE, RECOMMENT_EDIT_REQUEST, RECOMMENT_EDIT_SUCCESS, RECOMMENT_EDIT_FAILURE, RECOMMENT_DELETE_REQUEST, RECOMMENT_DELETE_SUCCESS, RECOMMENT_DELETE_FAILURE,
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


        case COMMENT_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMMENT_EDIT_SUCCESS:  {
            let idx = 0;
            for(let i = 0; i < state.comments.length; i++) {
                if(state.comments[i]._id === action.data._id) {
                    idx = i
                    break
                }
            }
            // state.comments.splice(idx, 1, {...action.data, edit: true},);
            state.comments.splice(idx, 1, {...action.data});
            // console.log(idx)
            // console.log(state.comments)
            // console.log(action.data)
           
            return {
                ...state,
                // comments: [...state.comments ], // ? 상태안바꾸고 해도되나 ..? 
                loading: false,
                
            }
        }
        case COMMENT_EDIT_FAILURE: 
            return {
                ...state,
                loading: false,
            }
            


        case COMMENT_DELETE_REQUEST:
            return {
                ...state,
                creatorId:'comment edit succ',
                loading: true,
            }
        case COMMENT_DELETE_SUCCESS:  {
            let idx = 0;
            for(let i = 0; i < state.comments.length; i++) {
                if(state.comments[i]._id === action.data._id) {
                    idx = i
                    break
                }
            }
            state.comments.splice(idx, 1, {...action.data});
           
            return {
                ...state,
                loading: false,
                
            }
        }
        case COMMENT_DELETE_FAILURE: 
            return {
                ...state,
                loading: false,
            }


        // recomment upload
        case RECOMMENT_UPLOAD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RECOMMENT_UPLOAD_SUCCESS: {
            const commentList = state.comments.filter(val => val._id === action.data._id)
            const dataRecomment = action.data.recomment;
            const result = commentList[0].recomment = commentList[0].recomment.concat(dataRecomment[dataRecomment.length-1])

            // console.log(result, 'ㄹㅣ듀서 코ㅐ트')
            // console.log(recommentConcat, 'ㄹㅣ듀서 리코ㅐ트')
            return {
                ...state,
                comments: [...state.comments], //이거하다가 말았음 
                loading: false,
            }
        }
        case RECOMMENT_UPLOAD_FAILURE:
            return {
                ...state,
                loading: false,
            }


        // recomment edit
        case RECOMMENT_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RECOMMENT_EDIT_SUCCESS: {
            
            return {
                ...state,
                loading: false,
            }
        }
        case RECOMMENT_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
            }


        // recomment delete
        case RECOMMENT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RECOMMENT_DELETE_SUCCESS: {
            
            return {
                ...state,
                loading: false,
            }
        }
        case RECOMMENT_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
            }



    
        default: return { ...state };
    }
}

export default reducer;