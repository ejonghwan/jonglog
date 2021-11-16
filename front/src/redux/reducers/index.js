import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user.js'

const createRootReducers = history => combineReducers({ 
    router: connectRouter(history),
    user: user,
})



export default createRootReducers