import { put, takeEvery, call, delay } from 'redux-saga/effects'

import { ACTION_TYPES, createAction } from '../constants/actions'
import { NOTIF_DELAY } from '../constants'

export function* push_notif({ payload }) {
    console.log("Notif pushed", payload)
    yield delay(NOTIF_DELAY)
    console.log("Notif cleared")
    yield put(createAction(ACTION_TYPES.CLEAR_NOTIF))
}

export default function* notifSaga() {
    yield takeEvery(ACTION_TYPES.PUSH_NOTIF, push_notif)
}