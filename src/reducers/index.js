
import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'

import user from './user'
import utils from './utils'

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    user,
    utils,
})

export default createRootReducer