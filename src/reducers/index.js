
import {combineReducers} from 'redux'

import user from './user'
import notif from './notif'

const rootReducer = combineReducers({
    user,
    notif,
})

export default rootReducer