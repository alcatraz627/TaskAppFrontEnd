import { put, takeEvery, call } from 'redux-saga/effects'
// import history from '../utils/history'

import apiCall from '../services/api'

import { HTTP_METHODS } from '../constants'
import ROUTES from '../constants/routes'
import API_ROUTES from '../constants/apiRoutes'


import { ACTION_TYPES, createAction } from '../constants/actions'

export function* attempt_login({ type, payload }) {
    // console.log('In saga', payload)
    let { status, data, error } = yield apiCall({ url: API_ROUTES.LOGIN, method: HTTP_METHODS.POST, payload })
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.LOGIN_SUCCESS, data))
    } else {
        console.log("Error", error)
    }
}

export function* attempt_logout() {
    yield apiCall({ url: API_ROUTES.LOGOUT, method: HTTP_METHODS.POST })
    yield put(createAction(ACTION_TYPES.LOGOUT_SUCCESS))
}

// export function* login_success() {
//     console.log("In saga, pre-login_success", history.location)
//     yield call([history, history.push], ROUTES.ROOT)
//     console.log("In saga, post-login_success", history.location)
// }

// export function* logout_success() {
//     console.log("In saga, pre-logout_success", history.location)
//     yield call([history, history.push], ROUTES.ROOT)
//     console.log("In saga, post-logout_success", history.location)
// }

export default function* userSaga() {
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGIN, attempt_login)
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGOUT, attempt_logout)

    // yield takeEvery(ACTION_TYPES.LOGIN_SUCCESS, login_success)
    // yield takeEvery(ACTION_TYPES.LOGOUT_SUCCESS, logout_success)
}