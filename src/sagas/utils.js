import { put, putResolve, takeEvery, takeLatest, all, call, delay, select } from 'redux-saga/effects'

import apiCall from '../services/api'

import { push, } from 'connected-react-router'
import ROUTES from '../constants/routes'

import { ACTION_TYPES, createAction } from '../constants/actions'
import { NOTIF_DELAY, NOTIF_TYPE } from '../constants'

export function* push_notif({ payload }) {
    yield delay(NOTIF_DELAY)
    yield put(createAction(ACTION_TYPES.CLEAR_NOTIF))
}

export function* set_message() {
    yield put(push(ROUTES.MESSAGE.url))
}

export function* check_connection() {
    let { status, data, error } = yield apiCall({ url: "/" })
    console.log("Conn", data, error)
    if (error) {
        yield put(createAction(ACTION_TYPES.PUSH_NOTIF, { type: NOTIF_TYPE.WARNING, message: "The server seems to be unavailable. Capabilities of the app will be limited." }))
        yield put(createAction(ACTION_TYPES.SET_ONLINE_STATUS, { isOnline: false }))
        return false;
    } else {
        yield put(createAction(ACTION_TYPES.SET_ONLINE_STATUS, { isOnline: true }))
        return true
    }
}

export function* run_sync() {
    let lastQueryParams = yield select(store => store.utils.lastQueryParams)
    console.log(lastQueryParams)

    yield all(Object.keys(lastQueryParams).filter(k => !!lastQueryParams[k])
        .map(k => putResolve(createAction(`FETCH_${k}`, lastQueryParams[k]))))

    yield delay(parseInt(process.env.SYNC_DELAY) || 5 * 60 * 1000)
    yield put(createAction(ACTION_TYPES.RUN_SYNC))
}

export default function* utilsSaga() {
    yield takeEvery(ACTION_TYPES.PUSH_NOTIF, push_notif)
    yield takeEvery(ACTION_TYPES.SET_MESSAGE, set_message)
    yield takeLatest(ACTION_TYPES.RUN_SYNC, run_sync)
}