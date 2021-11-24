import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user.js';
import posts from './posts.js';
import comment from './comment.js';

const createRootReducers = history => combineReducers({ 
    router: connectRouter(history),
    user,
    posts,
    comment,
})



export default createRootReducers