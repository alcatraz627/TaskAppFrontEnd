
import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'

import user from './user'
import task from './task'
import utils from './utils'

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    user,
    task,
    utils,
})

export default createRootReducer