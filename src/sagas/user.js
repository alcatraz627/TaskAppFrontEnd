import { put, takeEvery, call, all } from 'redux-saga/effects'

import apiCall from '../services/api'
import { getToken, setToken, deleteToken } from '../services/localstorage'

import { HTTP_METHODS, MESSAGES } from '../constants'
import API_ROUTES from '../constants/apiRoutes'
import { ACTION_TYPES, createAction } from '../constants/actions'

export function* attempt_login({ type, payload }) {
    // console.log('In saga', payload)
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.LOGIN, method: HTTP_METHODS.POST, payload }))
    if (status == 200) {
        yield put(createAction(ACTION_TYPES.LOGIN_SUCCESS, data))
    } else {
        console.log("Error", error)
    }
}

export function* attempt_logout() {
    yield call(apiCall, ({ url: API_ROUTES.LOGOUT, method: HTTP_METHODS.POST }))
    yield put(createAction(ACTION_TYPES.LOGOUT_SUCCESS))
}

export function* login_success({ type, payload }) {
    yield call(setToken, payload.token)
}

export function* logout_success() {
    yield call(deleteToken)
}

export function* fetch_auth_user() {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.USER_ME }))
    if (status == 200) {
        console.log(data)
        yield put(createAction(ACTION_TYPES.LOGIN_SUCCESS, { user: data, token: getToken() }))
    } else {
        yield call(deleteToken)
    }
}

export function* attempt_register({ payload }) {
    let { status, data, error } = yield call(apiCall, ({ url: API_ROUTES.REGISTER, method: HTTP_METHODS.POST, payload }))
    if (status == 201) {
        console.log(data)
        yield put(createAction(ACTION_TYPES.REGISTER_SUCCESS, data))
    } else if (status == 422) {
        console.log("Error", data)
        yield all(Object.values(data).map(message => put(createAction(ACTION_TYPES.PUSH_NOTIF, { message }))))
    } else {
        console.log("Error", data, error)
    }


}

export function* register_success() {
    yield put(createAction(ACTION_TYPES.SET_MESSAGE, MESSAGES.REGISTRATION_SUCCESS))
}

export default function* userSaga() {
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGIN, attempt_login)
    yield takeEvery(ACTION_TYPES.ATTEMPT_LOGOUT, attempt_logout)

    yield takeEvery(ACTION_TYPES.LOGIN_SUCCESS, login_success)
    yield takeEvery(ACTION_TYPES.LOGOUT_SUCCESS, logout_success)

    yield takeEvery(ACTION_TYPES.FETCH_AUTH_USER, fetch_auth_user)

    yield takeEvery(ACTION_TYPES.ATTEMPT_REGISTER, attempt_register)
    yield takeEvery(ACTION_TYPES.REGISTER_SUCCESS, register_success)


}