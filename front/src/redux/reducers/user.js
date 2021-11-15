const initialState = {
    token: '',

}

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: return {
            ...state,
        }
        case LOGIN_SUCCESS: return {
            ...state
        }

    }
}