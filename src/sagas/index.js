import { fork, all, put } from 'redux-saga/effects'

import user from './user'
import task from './task'
import utils from './utils'

import { ACTION_TYPES, createAction } from '../constants/actions'

export default function* rootSaga() {
    console.log("Loaded root saga!");
    yield fork(user)
    yield fork(task)
    yield fork(utils)

    // yield put(createAction(ACTION_TYPES.FETCH_AUTH_USER))
}

// export function* boot() {
//     console.log("Saga loaded!");
// }
