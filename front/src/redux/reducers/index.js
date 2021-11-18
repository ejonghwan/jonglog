import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user.js';
import posts from './posts.js'

const createRootReducers = history => combineReducers({ 
    router: connectRouter(history),
    user: user,
    posts: posts,
})



export default createRootReducers