import { fork, call, put, takeEvery } from 'redux-saga/effects'

import user, { fetch_auth_user } from './user'
import task from './task'
import utils, { check_connection } from './utils'

import { ACTION_TYPES, createAction } from '../constants/actions'


export function* logSagas(data) {
    console.log(data)
}

export default function* rootSaga() {
    yield fork(user)
    yield fork(task)
    yield fork(utils)

    // yield takeEvery("*", logSagas)

    // Sagas to run on boot
    if (yield* check_connection()) {
        console.log("Connection to server established!")
        yield* fetch_auth_user()
    } else {
        console.log("Uh oh. Server unavailable")
        yield put(createAction(ACTION_TYPES.SHOULD_RENDER))
    }
    // yield put(createAction(ACTION_TYPES.FETCH_AUTH_USER))
}

// export function* boot() {
//     console.log("Saga loaded!");
// }
